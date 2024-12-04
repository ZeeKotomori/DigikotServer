import express from 'express';
import AuthController from '../controller/authController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'

const authRoute = express.Router();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
authRoute.post('/logout', authenticateToken, AuthController.logout);

export default authRoute;