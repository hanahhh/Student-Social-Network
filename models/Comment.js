import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Comment", CommentSchema);
