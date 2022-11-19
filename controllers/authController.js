import CONFIG_STATUS from "../config/status.json";
import { REGEX } from "../config/regex.js";
import { login, getUserInfo } from "../service/auth.js";
import { updateUserByID, createUser } from "../service/user.js";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyToken,
  verifyPassword,
} from "../utils/security.js";

export const registerController = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (name == null || email == null || password == null || role == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkEmail = REGEX.EMAIL_REGEX.test(email);
    if (!checkEmail) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Please try again, email is invalid form.",
      });
    } else {
      const result = await createUser(req.body);
      if (result.status != 0) {
        res.status(200).send({
          ...result,
        });
      } else {
        res.status(500).send({
          ...result,
        });
      }
    }
  }
};

export const loginController = async (req, res, next) => {
  const loginForm = {
    email: req.body.email,
    password: req.body.password,
  };
  const { result } = await login(loginForm.email);
  if (result) {
    const compare = await verifyPassword(loginForm.password, result.password);
    const { info } = await getUserInfo(loginForm.email);
    if (compare) {
      const updates = await updateUserByID(
        {
          refresh_token: generateRefreshToken({
            email: loginForm.email,
            educationStatus: info.educationStatus,
            role: info.role,
          }),
          updated_at: Date.now(),
        },
        info._id
      );
      res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: "Login successful.",
        data: {
          access_token: generateAccessToken({
            email: info.email,
            educationStatus: info.educationStatus,
            _id: info._id,
            role: info.role,
          }),
          refresh_token: updates.result.refresh_token,
          user_info: {
            email: info.email,
            educationStatus: info.educationStatus,
            _id: info._id,
            role: info.role,
          },
        },
      });
      next();
    } else {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Wrong password",
      });
    }
  } else {
    res.status(403).send({
      status: CONFIG_STATUS.FAIL,
      message: "Account not found",
    });
  }
};

export const logoutController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  const _id = decodedToken.data._id;

  const result = await updateUserByID(
    {
      refresh_token: "EMPTY",
      updated_at: Date.now(),
    },
    _id
  );

  if (result.status != 0) {
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Logout successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Logout failed.",
    });
  }
};
