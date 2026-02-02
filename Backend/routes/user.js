import express from "express";

const router = express.Router();

import { handleUserSignup, handleUserLogin } from "../controllers/user.js";

router.post("/signup", handleUserSignup);

router.post("/signin", handleUserLogin);

export default router;
