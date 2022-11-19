import pkg from "jsonwebtoken";
import bcrypt from "bcrypt";
import CONFIG_STATUS from "../config/status.json";

const { sign, decode, verify } = pkg;
const SALT_ROUND = 10;
//const TOKEN_EXPIRE_USER = process.env.TOKEN_EXPIRE_USER;

//encode password at plaintext type
export const generatePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  return hashedPassword;
};
//verify password
export const verifyPassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
//decode password
export const decodePassword = async (password) => {
  const decodedPassword = await bcrypt.hash(password, -SALT_ROUND);
  return decodedPassword;
};

export const generateAccessToken = ({ email, educationStatus, _id, role }) => {
  const { JWT_SECRET_KEY, TOKEN_EXPIRE_USER } = process.env;
  const token = sign({ email, educationStatus, _id, role }, JWT_SECRET_KEY, {
    expiresIn: parseInt(TOKEN_EXPIRE_USER),
  });

  return token;
};

export const generateRefreshToken = ({ email, educationStatus, role }) => {
  const { JWT_SECRET_KEY } = process.env;
  const token = sign({ email, educationStatus, role }, JWT_SECRET_KEY);

  return token;
};

export const verifyToken = (token) => {
  const { JWT_SECRET_KEY } = process.env;
  try {
    const data = verify(token, JWT_SECRET_KEY);
    return {
      status: 200,
      data,
    };
  } catch (error) {
    return {
      status: CONFIG_STATUS.TOKEN_EXPIRED,
      message: `Token Expired`,
    };
  }
};
