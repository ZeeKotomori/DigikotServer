import express from 'express';
import AuthController from '../controller/authController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'

const authRoute = express.Router();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
authRoute.post('/verify-otp', AuthController.verifyOtp);
authRoute.post('/logout', authenticateToken, AuthController.logout);
authRoute.post('/forgot-password', AuthController.forgotPassword);
authRoute.post('/reset-password', AuthController.resetPassword);
authRoute.patch("/update-password", authenticateToken, AuthController.updatePassword);

export default authRoute;