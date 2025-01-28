import express from 'express';
import TrayekController from '../controller/trayekController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js';

const trayekRoutes = express.Router();

trayekRoutes.post('/', authenticateToken,  checkUserRole(['a']), TrayekController.createTrayek);
trayekRoutes.get('/', authenticateToken, checkUserRole(['a']), TrayekController.getAllTrayeks);
trayekRoutes.patch('/:id', authenticateToken, checkUserRole(['a']), TrayekController.updateTrayek);
trayekRoutes.delete('/:id', authenticateToken, checkUserRole(['a']), TrayekController.deleteTrayek);
trayekRoutes.get('/findTrayeks',authenticateToken, checkUserRole(['a']), TrayekController.findTrayek);

// Route untuk mencari multi trayek
// trayekRoutes.get('/multi', TrayekController.findMultiTrayek);

export default trayekRoutes;
