import express from "express";

import {
  getFriendships,
  getMyFriends,
  addFriendship,
  deleteFriendship,
} from "../controllers/friendships.js";

const router = express.Router();

router.get("/", getFriendships);
router.get("/:userId", getMyFriends);
router.post("/", addFriendship);
router.delete("/:friendshipId", deleteFriendship);

export default router;
