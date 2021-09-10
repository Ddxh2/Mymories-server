import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  profileImage: String,
  isPrivate: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
