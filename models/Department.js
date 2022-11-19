import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school_id: {
    type: String,
    required: true,
  },
  global_name: {
    type: String,
  },
  sort_name: {
    type: String,
  },
  student_amount: {
    type: Number,
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

export default mongoose.model("Department", DepartmentSchema);
