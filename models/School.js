import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school_code: {
    type: String,
    required: true,
  },
  student_amount: {
    type: Number,
    required: true,
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

export default mongoose.model("School", SchoolSchema);
