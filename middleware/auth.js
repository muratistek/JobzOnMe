import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  console.log(req.cookies)

  // Access the Authorization header value of JWT token with Bearer schema
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    // We receive the payload from the first argument of the jwt.sign() in the "createJWT" method of User Model
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Check if the logged user is test user (for demo app) or not
    const testUser = payload.userId === "6456c84d0e741087f38341d4"

    // In the request controllers (like update user) we will access this userId property. We simply use this middleware and then access the "request" object in the following method (defined by "next()")
    req.user = { userId: payload.userId, testUser }

    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth