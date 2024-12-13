import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
let tokenBlacklist = new Set();

class AuthController {
    static async register(req, res) {
        const { name, email, username, password } = req.body;

        console.log(req.body);
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

            if (!user) res.status(401).send({ msg : "user not found" });

            const isPasswordValid = await bcrypt.compare( password, user.password );

            if(!isPasswordValid) return res.status(401).send({ msg : "Invalid Password" });

            const token = jwt.sign({ userId: user.id, userName : user.name, userEmail : user.email }, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN });
            return res.status(200).send({ msg : "Login Successful, here's the token", token });

        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ msg : "Internal Server Error" })
        }
    }

    static async logout(req, res) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) return res.status(400).send({ msg : 'Token not provided' });

        tokenBlacklist.add(token);
        return res.status(200).send({ msg : "Successfully logged out" });
    }
}

export default AuthController;