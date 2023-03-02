import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "There was some error"
  }

  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST

    // More generic message
    // defaultError.msg = err.message

    // More detailed message
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')
  }

  // res.status(defaultError.statusCode).json({ msg: err });
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware