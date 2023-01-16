import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: true,
    default: "",
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

export default mongoose.model("Semester", SemesterSchema);
