import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { ApiError } from "./utils/ApiError.js";


connectDB().then(() => {
  app.listen(3000, () => console.log("server started at port 3000"))
}).catch((error) => {
  console.log(error.message)
  throw new ApiError(500, "SERVER NOT CONNECTED")
})

