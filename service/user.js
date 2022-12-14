import User from "../models/User.js";
import CONFIG_STATUS from "../config/status.json";
import { generatePassword } from "../utils/security.js";
import { REGEX } from "../config/regex.js";

export const checkExistUser = async (user_id) => {
  let isExist = Boolean;
  const checkExist = await User.exists({ _id: user_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const createUser = async ({ name, email, password, role }) => {
  if (!["USER", "ADMIN"].includes(role)) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "Invalid role",
    };
  }
  const isExist = await User.exists({ email });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The user is already existed.",
    };
  } else {
    const encryptedPassword = await generatePassword(password);
    await User.create({
      name,
      email,
      password: encryptedPassword,
      role,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The user is created successful.",
    };
  }
};

export const getAllUser = async () => {
  const result = await User.find();
  return {
    result,
  };
};

export const updateUserByID = async (form, user_id) => {
  const checkExist = await User.exists({ _id: user_id });
  if (checkExist) {
    const update_result = await User.findByIdAndUpdate(user_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update user successful",
      result: {
        refresh_token: update_result.refresh_token,
        _id: update_result._id,
        email: update_result.email,
        created_at: update_result.created_at,
        updated_at: update_result.updated_at,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "Update user failed, user id is not exist. Please try again",
    };
  }
};

export const getUserByID = async (user_id) => {
  const user = await User.findOne(
    { _id: user_id },
    "name nick_name email avatar description education website educationStatus role"
  );

  return {
    user,
  };
};

export const getUserInfo = async (user_id) => {
  const user = await User.findById(
    user_id,
    "name nick_name email avatar description education website educationStatus role"
  );
  return {
    user,
  };
};

export const deleteUser = async (user_id) => {
  const result = await User.findByIdAndDelete(user_id);
  return {
    result,
  };
};
