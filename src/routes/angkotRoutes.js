import express from 'express';
import AngkotController from '../controller/angkotController.js';
import  { authenticateToken } from '../middleware/authMiddleware.js'
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js';

const angkotRoute = express.Router();

angkotRoute.get('/', AngkotController.getAngkots);
angkotRoute.post('/',  authenticateToken, checkUserRole(['a']), AngkotController.createAngkot);
angkotRoute.get('/:id', AngkotController.getAngkotById);
angkotRoute.patch('/:id', authenticateToken, checkUserRole(['a']), AngkotController.updateAngkot);
angkotRoute.delete('/:id',  authenticateToken, checkUserRole(['a']), AngkotController.deleteAngkot);
angkotRoute.get('/status/:id', AngkotController.getAngkotStatus);
angkotRoute.get('/searchAngkot/search', AngkotController.searchAngkot);

export default angkotRoute;