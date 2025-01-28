import express from 'express';
import UserController from '../controller/userController.js';
// import  { authenticateToken } from '../middleware/authMiddleware.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/', authenticateToken, checkUserRole(['a']), UserController.userCreate);
userRoutes.patch('/update/:id', UserController.userUpdate);
userRoutes.get('/', authenticateToken, checkUserRole(['a']) ,UserController.getUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;