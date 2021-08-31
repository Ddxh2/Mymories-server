import User from "../models/user.js";

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

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (stringHash(password) === user.password) {
      res.status(200).json(true);
    } else {
      res.status(401).json(false);
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password: stringHash(password) });
  try {
    await newUser.save();
    res.status(201).json(true);
  } catch (error) {
    res.status(409).json(error);
  }
};
