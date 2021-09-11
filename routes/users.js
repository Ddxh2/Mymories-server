import express from "express";

import {
  getUser,
  findUsersByUsername,
  logIn,
  createUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/:identifier", getUser);
router.get("/find/:username", findUsersByUsername);
router.post("/login", logIn);
router.post("/", createUser);
router.patch("/:identifier", updateUser);

export default router;
