import User from "../models/user.js";
import NodeRSA from "node-rsa";

import { idValid } from "./utils.js";

const stringHash = (string) => {
  if (!string || string.length === 0) {
    return null;
  }

  let hash = 0;
  let chr;

  for (let i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

export const getUser = async (req, res) => {
  const { identifier } = req.params;
  try {
    const queryField = idValid(identifier) ? "_id" : "username";
    const user = await User.find({ [queryField]: identifier });

    const { _id: id, username, profileImage } = user[0];
    res.status(200).json({ id, username, profileImage });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const findUsersByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.find({
      username: { $regex: ".*" + username + ".*" },
    });
    const processedUsers = users.map(({ _id: id, username, profileImage }) => ({
      id,
      username,
      profileImage,
    }));
    res.status(200).json(processedUsers);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const logIn = async (req, res) => {
  const { username, password: encryptedPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user === null) {
      // Wrong Username
      res.status(403).json({ success: false });
    } else {
      const key = new NodeRSA(process.env.PRIVATE_KEY);
      const decryptedPassword = key.decrypt(encryptedPassword, "utf8");
      if (stringHash(decryptedPassword) === user.password) {
        const { _id: id, username, profileImage } = user;
        res.status(200).json({ success: true, id, username, profileImage });
        // Wrong Password
      } else {
        res.status(401).json({ success: false });
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createUser = async (req, res) => {
  const { username, password: encryptedPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user !== null) {
      //Username Taken
      res.status(403).json({ success: false });
    } else {
      const key = new NodeRSA(process.env.PRIVATE_KEY);
      const decryptedPassword = key.decrypt(encryptedPassword, "utf8");
      const newUser = new User({
        username,
        password: stringHash(decryptedPassword),
      });
      await newUser.save();
      res.status(201).json({
        success: true,

        username,
        id: newUser._id,
        profileImage: newUser.profileImage,
      });
    }
  } catch (error) {
    res.status(409).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { identifier } = req.params;
  const user = req.body;
  const queryField = idValid(identifier) ? "_id" : "username";

  try {
    const updatedUser = await User.findOneAndUpdate(
      { [queryField]: identifier },
      user,
      { new: true }
    );
    const { _id: id, username, profileImage } = updatedUser;
    res.status(201).json({ success: true, id, username, profileImage });
  } catch (error) {
    res.status(404).json(error);
  }
};
