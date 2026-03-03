import rateLimit from "express-rate-limit";


export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({
      message: "too many requests",
      retryAfter: req.rateLimit?.resetTime
    })
})


export const resetPassRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({
      message: "too many requests",
      retryAfter: req.rateLimit?.resetTime
    }),
})
