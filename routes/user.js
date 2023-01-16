import express from "express";
import {
  deleteUserController,
  getAllUserController,
  getUserByIDController,
  getUserInfoController,
  updateUserByIdController,
} from "../controllers/userController.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import { TryCatch } from "../middlewares/errorHandle.js";
const router = express.Router();

router.get(
  "/",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(getAllUserController)
);
router.get("/detail/:user_id", requireLogin, TryCatch(getUserByIDController));
router.get("/info", requireLogin, TryCatch(getUserInfoController));
router.put(
  "/detail/:user_id",
  requireLogin,
  TryCatch(updateUserByIdController)
);
router.delete(
  "/:user_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteUserController)
);

export default router;
