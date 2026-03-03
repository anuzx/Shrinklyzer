import { getUser } from "../service/auth.js";
import { ApiError } from "../utils/ApiError.js";

function checkForAuthentication(req, _res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function(req, res, next) {
    if (!req.user) {
      throw new ApiError(400, "user not verified")
    };

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "unauthorized")
    };

    return next();
  };
}

export {
  checkForAuthentication,
  restrictTo,
};
