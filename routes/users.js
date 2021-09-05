import express from "express";

import { getUsers, logIn, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", logIn);
router.post("/", createUser);

export default router;
