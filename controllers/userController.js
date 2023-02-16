import CONFIG_STATUS from "../config/status.json";
import { educationStatus } from "../config/systemStatus.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import { checkExistSchool, getSchoolByID } from "../service/school.js";
import {
  checkExistUser,
  deleteUser,
  getAllUser,
  getUserByID,
  getUserInfo,
  updateUserByID,
} from "../service/user.js";
import { generatePassword, verifyToken } from "../utils/security.js";

export const getAllUserController = async (req, res) => {
  const user_list = await getAllUser();
  dataHandle(user_list, req, res);
};

export const getUserByIDController = async (req, res) => {
  const { user_id } = req.params;
  const isExist = await checkExistUser(user_id);
  if (isExist) {
    const user = await getUserByID(user_id);
    const tmp = user.user;
    const school = await getSchoolByID(tmp.school_id);

    if (tmp.educationStatus == educationStatus.DISABLE) {
      const user = {
        user: {
          _id: tmp._id,
          name: tmp.name,
          email: tmp.email,
          avatar: tmp.avatar,
          educationStatus: tmp.educationStatus,
          description: tmp?.description,
          education: tmp?.education,
          nick_name: tmp?.nick_name,
          website: tmp?.website,
          school: school.school.name,
          school_id: tmp.school_id,
        },
      };
      dataHandle(user, req, res);
    } else {
      const user = {
        user: {
          _id: tmp._id,
          name: tmp.name,
          email: tmp.email,
          avatar: tmp.avatar,
          educationStatus: tmp.educationStatus,
          role: tmp.role,
          cpa: tmp.cpa,
          credits: tmp.credits,
          description: tmp?.description,
          education: tmp?.education,
          nick_name: tmp?.nick_name,
          website: tmp?.website,
          school: school.school.name,
          school_id: tmp?.school_id,
        },
      };
      dataHandle(user, req, res);
    }
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
  if (user_info.user.school_id) {
    const school = await getSchoolByID(user_info.user.school_id);
    const user = {
      user: {
        _id: user_info.user._id,
        name: user_info.user.name,
        email: user_info.user.email,
        avatar: user_info.user.avatar,
        educationStatus: user_info.user.educationStatus,
        role: user_info.user.role,
        cpa: user_info.user.cpa,
        credits: user_info.user.credits,
        description: user_info.user?.description,
        education: user_info.user?.education,
        nick_name: user_info.user?.nick_name,
        website: user_info.user?.website,
        school: school.school.name,
        school_id: user_info.user?.school_id,
      },
    };
    dataHandle(user, req, res);
  } else {
    dataHandle(user_info, req, res);
  }
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
    school_id,
  } = req.body;

  let updates;
  if (password != null) {
    const encryptedPassword = await generatePassword(password);
    updates = {
      ...req.body,
      password: encryptedPassword,
      updated_at: Date.now(),
    };
  }
  if (school_id != null) {
    const school = await checkExistSchool(school_id);
    if (!school.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "School is not exist.",
      });
      return;
    }
  }
  updates = {
    ...req.body,
    updated_at: Date.now(),
  };

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
