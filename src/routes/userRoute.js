import express from 'express';
import UserController from '../controller/userController.js';
// import  { authenticateToken } from '../middleware/authMiddleware.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js'

const userRoutes = express.Router();

userRoutes.post('/pilihAngkot/:id', checkUserRole(['s']), UserController.driverChooseAngkot);
userRoutes.patch('/update/:id', UserController.userUpdate);
userRoutes.get('/', UserController.getUsers);
userRoutes.get('/:id', UserController.getUserById);

export default userRoutes;