import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  authorId: { type: mongoose.Types.ObjectId, ref: "User" },
  tags: [String],
  selectedFile: String,
  likeCount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
