import express from 'express';
import UserController from '../controller/userController.js';
// import  { authenticateToken } from '../middleware/authMiddleware.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js'

const userRoutes = express.Router();

userRoutes.post('/pilihAngkot/:id', checkUserRole(['s']), UserController.driverChooseAngkot);

export default userRoutes;