import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import { ApiError } from "../utils/ApiError.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("DB CONNECTED !!")
  } catch (error) {
    console.log(error)
    throw new ApiError(503, "db connection error")
  }
}
