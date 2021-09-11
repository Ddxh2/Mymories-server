import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsForMe,
  getMyPosts,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.get("/:userId", getPostsForMe);
router.get("/my/:userId", getMyPosts);

export default router;
