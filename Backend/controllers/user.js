import { User } from "../models/user.js";
import { setUser } from "../service/auth.js";

//signup

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (password.length < 6) {
    return res.json({
      message: "not a valid password ",
    });
  }

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
  const { email, password } = req.body;
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
