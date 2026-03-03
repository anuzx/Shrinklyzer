import { ApiError } from "../utils/ApiError.js"
import { ApiRes } from "../utils/ApiRes.js"


export const globalErrorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    return res.status(500).json(new ApiRes(
      500,
      err.message,
      null
    ))
  }

  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  })
}
