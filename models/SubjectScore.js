import mongoose from "mongoose";

const SubjectScoreSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  midterm_score: {
    type: Number,
    default: 0,
  },
  endterm_score: {
    type: Number,
    default: 0,
  },
  final_score: {
    type: Number,
    default: 0,
  },
  final_score_char: {
    type: String,
    default: "NULL",
  },
  subject_status: {
    type: Number,
    enum: [0, 1, 2],
    default: 2,
    required: true,
  },
  semester: {
    type: String,
  },
  schedule: {
    type: String,
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

export default mongoose.model("SubjectScore", SubjectScoreSchema);
