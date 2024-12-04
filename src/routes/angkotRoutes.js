import express from 'express';
import AngkotController from '../controller/angkotController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'

const angkotRoute = express.Router();

angkotRoute.get('/angkot', AngkotController.getAngkots);
angkotRoute.post('/angkot', AngkotController.createAngkot);
// router.post('/angkot', authenticateToken, AuthController.logout);

export default angkotRoute;