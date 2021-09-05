import Friendship from "../models/friendship.js";

export const getFriendships = async (req, res) => {
  try {
    const friendships = await Friendship.find();
    res.status(200).json(friendships);
  } catch (error) {
    res.status(404).json(error);
  }
};

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
    if (!!existingFriendships && !!existingFriendships) {
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
