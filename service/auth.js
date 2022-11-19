import User from "../models/User.js";

export const login = async (email) => {
  const result = await User.findOne({ email }).exec();
  if (result) return { result };
  else return false;
};

export const getUserInfo = async (email) => {
  const info = await User.findOne(
    { email: email },
    "status email created_at updated_at educationStatus role"
  ).exec();
  return { info };
};
