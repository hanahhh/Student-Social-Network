import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import { TryCatch } from "../middlewares/errorHandle.js";
const router = express.Router();

//REGISTER
router.post("/login", TryCatch(loginController));
router.post(
  "/logout",
  requireLogin,
  requireRole(["USER", "ADMIN"]),
  TryCatch(logoutController)
);
router.post("/register", TryCatch(registerController));
export default router;
