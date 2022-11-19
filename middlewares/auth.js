import User from "../models/User.js";
import CONFIG_STATUS from "../config/status.json";
import { verifyToken } from "../utils/security.js";

export const requireLogin = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    res.status(401).send({
      status: CONFIG_STATUS.TOKEN_EMPTY,
      message: "Authorization is not exist.",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verifyToken(token);

    if (decodedToken.status == 403) {
      res.status(decodedToken.status).send(decodedToken);
    } else if (decodedToken.status == 200) {
      const userExist = await User.exists({ email: decodedToken.data.email });

      if (userExist) next();
      else {
        res.status(402).send({
          status: CONFIG_STATUS.TOKEN_ERROR,
          message: "Unauthorized !",
        });
      }
    } else {
      res.status(402).send({
        status: CONFIG_STATUS.TOKEN_ERROR,
        message: "Unauthorized !",
      });
    }
  }
};

export const requireRole = (roles) => async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);
  if (decodedToken.data.role == null) {
    res.status(403).send({
      status: CONFIG_STATUS.TOKEN_ERROR,
      message: "Token is missing role. Please try again.",
    });
  } else {
    if (roles.includes(decodedToken.data.role)) {
      next();
    } else {
      res.status(403).send({
        status: CONFIG_STATUS.TOKEN_ERROR,
        message: "Forbidden, your account is not granted.",
      });
    }
  }
};
