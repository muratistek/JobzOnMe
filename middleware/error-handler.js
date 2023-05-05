import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "There was some error"
  }

  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST

    // More generic message
    // defaultError.msg = err.message

    // More detailed message
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // This will output the field name where the unique property catch an error
    defaultError.msg = `The ${Object.keys(err.keyValue)} field has to be unique`
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware