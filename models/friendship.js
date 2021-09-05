import mongoose from "mongoose";

const { Schema } = mongoose;

const friendshipSchema = Schema({
  userId1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userId2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

export default Friendship;
