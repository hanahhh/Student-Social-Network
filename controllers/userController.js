import User from "../models/User.js";
import CONFIG_STATUS from "../config/status.json";
import {
  checkExistUser,
  deleteUser,
  getUserByID,
  getUserInfo,
  updateUserByID,
  getAllUser,
} from "../service/user.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import { verifyToken } from "../utils/security.js";
import { generatePassword } from "../utils/security.js";

export const getAllUserController = async (req, res) => {
  const user_list = await getAllUser();
  dataHandle(user_list, req, res);
};

export const getUserByIDController = async (req, res) => {
  const { user_id } = req.params;
  const isExist = await checkExistUser(user_id);
  if (isExist) {
    const user = await getUserByID(user_id);
    dataHandle(user, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getUserInfoController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const user_id = decodedToken.data._id;
  const user_info = await getUserInfo(user_id);
  dataHandle(user_info, req, res);
};

export const updateUserByIdController = async (req, res) => {
  const { user_id } = req.params;
  const {
    name,
    nick_name,
    email,
    description,
    education,
    website,
    educationStatus,
    password,
    role,
  } = req.body;
  if (email != null || role != null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Email cannot be update.",
    });
  } else {
    if (name == null || educationStatus == null) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Request body is invalid.",
      });
    } else {
      let updates;
      if (password != null) {
        const encryptedPassword = await generatePassword(password);
        updates = {
          ...req.body,
          password: encryptedPassword,
          updated_at: Date.now(),
        };
      } else {
        updates = {
          ...req.body,
          updated_at: Date.now(),
        };
      }
      const result = await updateUserByID(updates, user_id);
      if (result.status == 0) {
        res.status(500).send({
          ...result,
        });
      } else {
        res.send({
          ...result,
        });
      }
    }
  }
};

export const deleteUserController = async (req, res) => {
  const { user_id } = req.params;
  const { isExist } = await checkExistUser(user_id);
  if (isExist) {
    const user = await deleteUser(user_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete user successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};
