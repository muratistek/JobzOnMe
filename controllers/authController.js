import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

// Custom Errors
import { BadRequestError, NotFoundError } from '../errors/index.js'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Provide values for the required fields')
  }

  // Find a user with the provided email field to prevent duplicate
  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new BadRequestError("Provided email is already in use. Try different email")
  }

  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location
    }, token
  })
}
const login = async (req, res) => {
  res.send('login user')
}
const updateUser = async (req, res) => {
  res.send('update user')
}

export { register, login, updateUser }