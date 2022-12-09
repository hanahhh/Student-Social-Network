import mongoose from "mongoose";
import { REGEX } from "../config/regex.js";

const PostSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    ref: "User",
  },
  user_name: {
    type: String,
    required: true,
  },
  user_avatar: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    /*validate: {
      validator: (v) => {
        console.log(REGEX.URL_IMAGE_REGEX.test(v));
        return REGEX.URL_IMAGE_REGEX.test(v);
      },
      message: (props) => `${props.value} is not a valid url image.`,
    },*/
  },
  tags: {
    type: [String],
    default: [],
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

export default mongoose.model("Post", PostSchema);
