import express from "express";

import {
  getFriendships,
  getMyFriends,
  addFriendship,
} from "../controllers/friendships.js";

const router = express.Router();

router.get("/", getFriendships);
router.post("/", addFriendship);
router.get("/:userId", getMyFriends);

export default router;
