import express from 'express';
import SupirController from '../controller/supirController.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const supirRoutes = express.Router();

supirRoutes.post('/pilihAngkot/:id', authenticateToken, checkUserRole(['s']), SupirController.driverChooseAngkot);
supirRoutes.patch('/hapusAngkotDariDriver/:id', authenticateToken, checkUserRole(['s']), SupirController.removeDriverFromChooseAngkot);
supirRoutes.patch('/activeAngkot/:angkotId', authenticateToken, checkUserRole(['s']), SupirController.activeNonActiveAngkot);
supirRoutes.patch('/updateLocation/:angkotId', authenticateToken, checkUserRole(['s']), SupirController.updateLocation);
supirRoutes.get('/myAngkot', authenticateToken, checkUserRole(['s']), SupirController.getMyAngkot);

export default supirRoutes;