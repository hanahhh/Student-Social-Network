import mongoose from "mongoose";

const PredictResult = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  semester_id: {
    type: String,
    required: true,
  },
  predictResult: {
    type: Object,
    require: true,
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

export default mongoose.model("PredictResult", PredictResult);
