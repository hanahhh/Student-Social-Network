import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  post_amount: {
    type: Number,
    default: 0,
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

export default mongoose.model("Tag", TagSchema);
