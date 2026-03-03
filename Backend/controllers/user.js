import { User } from "../models/user.js";
import { setUser } from "../service/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { SigninSchema, SingupSchema } from "../validator/schema.js";

//signup

async function handleUserSignup(req, res) {
  const parsedData = SingupSchema.safeParse(req.body)

  if (!parsedData.success) {
    throw new ApiError(400, "INVALID_REQUEST")
  }

  const { email, password, name } = parsedData.data

  await User.create({
    name,
    email,
    password,
  });
  return res.json({
    message: "signup successfull",
  });
}

//login

async function handleUserLogin(req, res) {
  const parsedData = SigninSchema.safeParse(req.body)

  if (!parsedData.success) {
    throw new ApiError(400, "INVALID_REQUEST")
  }

  const { email, password } = parsedData.data

  const user = await User.findOne({
    email,
    password,
  });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
  });

  return res.status(201).json({
    message: "signin successfull",
    token: token,
  });
}

export { handleUserSignup, handleUserLogin };
