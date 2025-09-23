const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")

const app = express();
const port = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Serve static files
app.use(express.static(path.join(__dirname, "views")));

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false })); //middleware
app.use(cookieParser());

//route
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

app.use("/url", restrictToLoggedinUserOnly,urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user",  userRoute);

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
