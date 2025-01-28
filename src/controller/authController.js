import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_EXPIRES_REFRESH_IN } = process.env;
let tokenBlacklist = new Set();

class AuthController {
    static async register(req, res) {
        const { name, email, username, password } = req.body;

        try {
            const findExistsUser = await prisma.user.findUnique(
                {
                    where : {
                        username : username,
                        email : email
                    }
                });
    
            if (findExistsUser) return res.status(409).send({ msg : "The Email Has Been Registered" });

            if (!name || !email || !password || !username) return res.status(400).json({ error: 'name, username,email, and password are required.' });

            const HashPassword = await bcrypt.hash(password, 10);
            
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    username,
                    password: HashPassword,
                },
            });
            res.status(201).send({ msg: 'User Has Been Register', user : newUser });
        } catch (error) {
            console.log('Error registering user : ', error);
            res.status(500).json({ error: 'Internal Server Error' });
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
            console.log(error.message);
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
}

export default AuthController;