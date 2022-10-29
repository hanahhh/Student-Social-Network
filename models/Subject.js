import mongoose from "mongoose"

const SubjectSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        ref: 'Subject',
      },
      subject_code: {
        type: String,
        required: true,
        ref: 'Subject_code'
      },
      credits: {
        type: Number,
        default: "",
      },
      type: {
        type: String,
        enum: ["D", "D+", "C", "C+", "B", "B+", "A"],
        required: true,
      },
      user_num: {
        type: Number,
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
    }
  )
  
  export default mongoose.model("Subject", SubjectSchema)