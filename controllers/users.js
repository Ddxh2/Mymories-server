import User from "../models/user.js";
import NodeRSA from "node-rsa";

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
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
        res.status(200).json({ success: true, username, id: user._id });
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
      res.status(201).json({ success: true, username, id: newUser._id });
    }
  } catch (error) {
    res.status(409).json(error);
  }
};
