
import express from 'express'
import { login, signup, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.put('/update-profile', authMiddleware, updateProfile);

export default authRouter;
