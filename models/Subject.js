import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  school_id: {
    type: String,
    required: true,
  },
  department_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    default: 2,
  },
  ratio: {
    type: String,
    required: true,
    default: "5-5",
  },
  average_score: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
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

export default mongoose.model("Subject", SubjectSchema);
