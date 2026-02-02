import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;

function setUser(user) {
  if (!SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
      SECRET,
    );
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

export { setUser, getUser };
