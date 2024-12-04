import express from 'express';
import AngkotController from '../controller/angkotController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'

const angkotRoute = express.Router();

angkotRoute.get('/angkot', AngkotController.getAngkots);
angkotRoute.post('/angkot', AngkotController.createAngkot);
angkotRoute.get('/angkot/:id', AngkotController.getAngkotById);

export default angkotRoute;