import express from "express";

import {
  getUser,
  getUsers,
  logIn,
  createUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:identifier", getUser);
router.post("/login", logIn);
router.post("/", createUser);
router.patch("/:identifier", updateUser);

export default router;
