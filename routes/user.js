import express from "express";

const router = express.Router();

import { handleUserSignup, handleUserLogin } from "../controllers/user.js";

router.post("/", handleUserSignup);

router.post("/login", handleUserLogin);

export default router;
