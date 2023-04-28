import express from 'express'
const router = express.Router()

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

// Routes
router.route('/register').post(register)
router.route('/login').post(login)

// Since "register and login" are public routes we shouldn't check if the user is authenticated. But only auth users can update their profile
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router