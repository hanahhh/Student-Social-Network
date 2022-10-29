import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
      user_id: {
        type: String,
        required: true,
        ref: 'User',
      },
      content: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: "",
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
    }
  )
  
  export default mongoose.model("Post", PostSchema)