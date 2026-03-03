import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express";
import { restrictTo } from "./middlewares/auth.js";
import { URL } from "./models/url.js";

const app = express();


//middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false })); //middleware
app.use(cookieParser());


//route
import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

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

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.use(globalErrorHandler)

export { app }

