import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { connectToMongoDB } from "./connect.js";
import {URL} from "./models/url.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";
import { DB_NAME } from "./constants.js";
import { fileURLToPath } from "url";

const app = express();
const port = 8001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connection
connectToMongoDB(`${process.env.DB_URL}/${DB_NAME}`).then(() =>
  console.log("mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Serve static files

app.use(express.static(path.join(__dirname, "views")));

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false })); //middleware
app.use(cookieParser());
app.use(checkForAuthentication); //this will run everytime

//route
import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

// FIXED: Added null check and error handling
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  // CRITICAL FIX: Check if entry exists
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log("server started"));
