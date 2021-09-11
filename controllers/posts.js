import Post from "../models/post.js";
import Friendship from "../models/friendship.js";

import { idValid } from "./utils.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsForMe = async (req, res) => {
  const { userId } = req.params;
  try {
    const friendships = await Friendship.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    });
    const authorIds = (friendships || []).reduce(
      (acc, curr) => {
        const { userId1, userId2 } = curr;

        if (userId1.equals(userId)) {
          acc.push(userId2);
        } else {
          acc.push(userId1);
        }
        return acc;
      },
      [userId]
    );
    const posts = await Post.find({ authorId: { $in: authorIds } });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ authorId: userId });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!idValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!idValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  await Post.findByIdAndRemove(_id);

  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!idValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const post = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
