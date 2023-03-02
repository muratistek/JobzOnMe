import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new Error('Provide values for the required fields')
  }

  const user = await User.create({ name, email, password })
  res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req, res) => {
  res.send('login user')
}
const updateUser = async (req, res) => {
  res.send('update user')
}

export { register, login, updateUser }