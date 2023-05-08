import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import attachCookie from "../utils/attachCookie.js"

// Custom Errors
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'

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

  // Setup auth cookie
  attachCookie({ res, token })

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location
    },
    token,
    location: user.location
  })
}
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide all values")
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials")
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials")
  }

  // Generate a new token each time a user logs in 
  const token = user.createJWT()

  // Setting the password to "undefined" for a security purpose
  user.password = undefined

  // Setup auth cookie
  attachCookie({ res, token })

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Provide All Values")
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name
  user.lastName = lastName
  user.email = email
  user.location = location

  await user.save()

  // Generate a new JWT token after the user was updated. This way we regenerate the expiration date and improve security
  const token = user.createJWT()

  // Setup auth cookie
  attachCookie({ res, token })

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }