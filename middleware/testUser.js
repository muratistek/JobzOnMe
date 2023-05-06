import { BadRequestError } from "../errors/index.js";

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Test User is logged in. Readonly Mode!')
  }
  next()
}

export default testUser;