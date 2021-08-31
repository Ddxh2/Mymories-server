import express from "express";

import { logIn, createUser } from "../controllers/users.js";

const router = express.Router();

router.post("/login", logIn);
router.post("/", createUser);

export default router;
