import express from 'express'
import { login, logout, register } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getMe } from '../controllers/me.js';

const routes  = express.Router();
routes.post('/register',register);
routes.post('/login',login);
routes.post('/logout',logout);
routes.get('/me',authMiddleware,getMe)
export default routes;