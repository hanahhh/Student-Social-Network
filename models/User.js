import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      nick_name: {
        type: String,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default: "https://i.pinimg.com/564x/e5/c5/61/e5c561f7428e7c60283650330f0f9791.jpg",
      },
      description: {
        type: String,
      },
      education: {
        type: String,
      },
      website: {
        type: String,
      },
      educationStatus: {
        type: Number,
        default: 0,
      },
      refresh_token: {
        type: String,
        default: 'EMPTY',
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
  
  export default mongoose.model("User", UserSchema)