import express from 'express'
import rateLimiter from 'express-rate-limit'

const router = express.Router()

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 15,  // max 15 requests from a particular ip address in 15 minutes
  message: 'There are too many requests from this IP address. Please try again in 15 minutes',
})

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

// Routes
router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)

// Since "register and login" are public routes we shouldn't check if the user is authenticated. But only auth users can update their profile
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router