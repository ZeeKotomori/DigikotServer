import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto, { verify } from 'crypto';
import { connect } from "http2";

const prisma = new PrismaClient();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_EXPIRES_REFRESH_IN, USER_EMAIL, USER_PASS, DOMAIN } = process.env;
let tokenBlacklist = new Set();

class AuthController {
    static async register(req, res) {
        const { name, email, username, password, confirmPassword, phoneNumber} = req.body;
        if (!name || !email || !password || !username || !confirmPassword || !phoneNumber) return res.status(400).send({ msg: 'name, username, email, phone number ,password and confirmPassword are required.' });

        try {
            const findExistsUser = await prisma.user.findUnique(
                {
                    where : {
                        username : username,
                        email : email
                    }
                });

            if (findExistsUser) return res.status(409).send({ msg : "The Email Has Been Registered" });
            if(password !== confirmPassword) return res.status(400).send({ msg: "Password do not match" });
                
            const HashPassword = await bcrypt.hash(password, 10);
            
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    username,
                    phoneNumber,
                    password: HashPassword,
                },
            });

            const otp = crypto.randomInt(100000, 999999).toString();

            await prisma.otp_codes.create({
                data: {
                    otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    user :  {connect : {
                        id : newUser.id
                    }}
                }
            });

            const subject = "Email Verification Otp";
            const text = "Your Otp is : " + otp;
            const html = `<p>Kode OTP Anda adalah: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: USER_EMAIL,
                    pass: USER_PASS
                }
            });

            const sendMail = await transporter.sendMail({
                from: USER_EMAIL,
                to: email,
                subject: subject,
                text: text,
                html: html
            });

            if (!sendMail) {
                return res.status(500).send({ msg: 'Failed to send email' });
            }

            return res.status(201).send({ msg: 'User Has Been Register', user : newUser });
        } catch (error) {
            console.log('Error registering user : ', error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique(
                { where : 
                    { 
                        email : email
                    }
                });
            if (!user) return res.status(401).send({ msg : "user not found" });

            if (user.verify == false) return res.status(401).send({ msg : "Please verify your email" });

            const isPasswordValid = await bcrypt.compare( password, user.password );
            if(!isPasswordValid) return res.status(401).send({ msg : "Invalid Password" });

            const refreshToken = jwt.sign({ username : user.name, email : user.email }, JWT_EXPIRES_REFRESH_IN, { expiresIn : JWT_EXPIRES_REFRESH_IN });
            const token = jwt.sign({ username : user.name, email : user.email }, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN });

            await prisma.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt: new Date(Date.now() + parseInt(JWT_EXPIRES_REFRESH_IN) * 1000)
                }
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).send({ msg : "Login Successful, here's the token", token});
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg : "Internal Server Error" })
        }
    }

    static async logout(req, res) {
        const { refreshToken } = req.cookies;
        if(!refreshToken) return res.status(400).send({ msg : "Refresh Token Not Found" });

        try {
            const storedRefreshToken = await prisma.refreshToken.findUnique({
                where: {
                    token: refreshToken
                }
            });
            if(!storedRefreshToken) return res.status(401).send({ msg : "Invalid Refresh Token" });

            await prisma.refreshToken.delete({
                where: {
                    id: storedRefreshToken.id
                }
            });
            res.clearCookie('refreshToken');

            return res.status(200).send({ msg : "Logout Successful" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg : "Internal Server Error" });
        }
    }

    static async forgotPassword(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).send({ msg: "Email is required" });
    
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) return res.status(404).send({ msg: "User not found" });

            const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            await prisma.passwordResetToken.create({
                data :{
                    token : resetToken,
                    userId : user.id,
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
                }
            });
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: USER_EMAIL,
                    pass: USER_PASS
                }
            });

            console.log(USER_EMAIL, USER_PASS);

            const mailOptions = {
                from : USER_EMAIL,
                to : email,
                subject : "Password Reset Request",
                text: `Click this link to reset your password: http://${DOMAIN}/reset-password?token=${resetToken}`
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).send({ msg: "Password reset link has been sent to your email" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Internal Server Error" });
        }
    }
    
    static async resetPassword(req, res) {
        const { token } = req.query;
        const { newPassword, confirmPassword } = req.body;
        if (!token || !newPassword || !confirmPassword) return res.status(400).send({ msg: "Token and new password are required" });

        try {
            if(newPassword !== confirmPassword) return res.status(400).send({ msg: "Password do not match" });
            const decoded = jwt.verify(token, JWT_SECRET);
            const resetToken = await prisma.passwordResetToken.findUnique({
                where: { token }
            });

            if (!resetToken || resetToken.expiresAt < new Date()) {
                return res.status(400).send({ msg: "Invalid or expired token" });
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: { email: decoded.email },
                data: { password: hashPassword }
            });

            await prisma.passwordResetToken.delete({ where: { token } });

            return res.status(200).send({ msg: "Password has been reset successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Internal Server Error" });
        }
    }

    static async updatePassword(req, res) {
        try {
            const username = req.user.username;
            const { oldPassword, newPassword } = req.body;
    
            if (!oldPassword || !newPassword) return res.status(400).send({ msg : "old password and new password are required." });
    
            const user = await prisma.user.findUnique({
                where: { username: username },
            });
        
            if (!user) return res.status(404).send({ msg : "User not found" });

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) return res.status(400).send({ msg : "old password are wrong" });
        
            const hashedPassword = await bcrypt.hash(newPassword, 10);
        
            await prisma.user.update({
                where: { username: username },
                data: { password: hashedPassword },
            });
        
            return res.status(200).send({ msg : "Password has been updated !" });
        } catch (error) {
            console.log("Error update password:", error);
            return res.status(500).send({ msg : "Internal Server Error" });
        }
    }

    static async verifyOtp(req, res) {
        const { otp, email } = req.body;

        if (!otp || !email) return res.status(400).send({ msg: "Otp and email is required" });

        try {
            const existingOtp = await prisma.otp_codes.findFirst({
                where: {
                    otp: otp,
                    expiresAt: { gt: new Date() }
                },
                include: {
                    user: true
                }
            });

            const user = await prisma.user.findUnique({
                where : {
                    email : email
                }
            });

            await user.update({
                where: { email: email },
                data: { verify: true }
            });

            if (!existingOtp) return res.status(400).send({ msg: "Invalid or expired otp" });

            await prisma.otp_codes.delete({
                where: { id : existingOtp.id }
            });

            const refreshToken = jwt.sign({ username : user.name, email : user.email }, JWT_EXPIRES_REFRESH_IN, { expiresIn : JWT_EXPIRES_REFRESH_IN });
            const token = jwt.sign({ username : user.name, email : user.email }, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN });

            await prisma.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt: new Date(Date.now() + parseInt(JWT_EXPIRES_REFRESH_IN) * 1000)
                }
            });

            return res.status(200).send({ msg: "Otp has been verified", token });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Internal Server Error" });
        }
    }
}
export default AuthController;