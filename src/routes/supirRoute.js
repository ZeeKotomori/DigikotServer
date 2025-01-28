import express from 'express';
import SupirController from '../controller/supirController.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const supirRoutes = express.Router();

supirRoutes.post('/pilihAngkot/:id', authenticateToken, checkUserRole(['s']), SupirController.driverChooseAngkot);
supirRoutes.patch('/hapusAngkot/:id', authenticateToken, checkUserRole(['s']), SupirController.removeDriverFromChooseAngkot);

export default supirRoutes;