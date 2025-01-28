import express from 'express';
import TrayekController from '../controller/trayekController.js';

const trayekRoutes = express.Router();

// Route untuk mencari trayek tunggal (single trayek)
trayekRoutes.post('/', TrayekController.createTrayek);
trayekRoutes.get('/', TrayekController.getAllTrayeks);
trayekRoutes.get('/findTrayeks', TrayekController.findTrayek);

// Route untuk mencari multi trayek
// trayekRoutes.get('/multi', TrayekController.findMultiTrayek);

export default trayekRoutes;
