import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express";
import { connectToMongoDB } from "./connect.js";
import { DB_NAME } from "./constants.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";
import { URL } from "./models/url.js";

const app = express();
const port = 3000;

//connection
connectToMongoDB(`${process.env.DB_URL}/${DB_NAME}`).then(() =>
  console.log("mongodb connected"),
);

//middlewares
app.use(cors())
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false })); //middleware
app.use(cookieParser());
app.use(checkForAuthentication); //this will run everytime


//route
import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

app.use("/api/v1/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/api/v1/user", userRoute);

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
    },
  );

  // CRITICAL FIX: Check if entry exists
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log("server started at", port));
