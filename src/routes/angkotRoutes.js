import express from 'express';
import AngkotController from '../controller/angkotController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'

const angkotRoute = express.Router();

angkotRoute.get('/angkot', AngkotController.getAngkots);
// router.post('/angkot', AuthController.login);
// router.post('/angkot', authenticateToken, AuthController.logout);

export default angkotRoute;