import express from 'express'
import rateLimiter from 'express-rate-limit'

const router = express.Router()

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 15,  // max 15 requests from a particular ip address in 15 minutes
  message: 'There are too many requests from this IP address. Please try again in 15 minutes',
})

import { register, login, logout, updateUser, getCurrentUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

// Routes
router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logout').get(logout)

// Since "register and login" are public routes we shouldn't check if the user is authenticated. But only auth users can update their profile
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)

// This router is responsible to get the current user each time we refresh a page. This is needed for the auth cookie functionality. If the user is not valid, you will get the 401 error response
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default router