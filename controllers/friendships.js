import Friendship from "../models/friendship.js";
import { idValid } from "./utils.js";

export const getMyFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const friendships = await Friendship.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    });
    res.status(200).json(friendships);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const addFriendship = async (req, res) => {
  const { userId1, userId2 } = req.body;
  try {
    const existingFriendships = await Friendship.find({
      $or: [
        {
          userId1,
          userId2,
        },
        {
          userId1: userId2,
          userId2: userId1,
        },
      ],
    });
    if (!!existingFriendships && !!existingFriendships.length) {
      res.status(401);
    } else {
      const newFriendship = new Friendship({ userId1, userId2 });
      await newFriendship.save();

      res.status(201).json(newFriendship);
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

export const deleteFriendship = async (req, res) => {
  const { friendshipId: _id } = req.params;
  try {
    if (!idValid(_id)) {
      res.status(404).json("No friendship with that id");
    }
    await Friendship.findByIdAndRemove(_id);
    res.json(true);
  } catch (error) {
    res.status(403).json(error);
  }
};
