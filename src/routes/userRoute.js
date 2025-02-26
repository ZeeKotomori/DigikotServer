import express from 'express';
import UserController from '../controller/userController.js';
import { checkUserRole } from '../middleware/roleUserCheckMiddleware.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/', authenticateToken, checkUserRole(['a']), UserController.userCreate);
userRoutes.patch('/update/:id', authenticateToken, checkUserRole(['a']), UserController.userUpdate);
userRoutes.get('/', authenticateToken, UserController.getUsers);
userRoutes.get('/:id', authenticateToken, UserController.getUserById);
userRoutes.delete('/:id', authenticateToken, UserController.deleteUser);

export default userRoutes;