import CONFIG_STATUS from "../config/status.json";
import User from "../models/User.js";
import { verifyToken, generateAccessToken } from "../utils/security.js";

export const refreshTokenController = async (req, res) => {
  const { refresh_token } = req.body;
  if (refresh_token == null || refresh_token == "EMPTY") {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Invalid token. Please try again.",
    });
  } else {
    let checkUser = await User.exists({
      refresh_token,
    });
    if (checkUser) {
      var result = verifyToken(refresh_token);
      if (result.status != 200) {
        res.status(result.status).send(result);
      } else {
        const data = await User.findOne({ refresh_token });
        res.send({
          status: CONFIG_STATUS.SUCCESS,
          message: "Refresh token successful.",
          data: {
            access_token: generateAccessToken({
              email: data.email,
              educationStatus: data.educationStatus,
              _id: data._id,
              role: data.role,
            }),
          },
        });
      }
    } else {
      res.status(403).send({
        status: CONFIG_STATUS.REFRESH_TOKEN_NULL,
        message: "Refresh Token is not exist. Please try again.",
      });
    }
  }
};
