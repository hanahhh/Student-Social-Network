import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createDepartmentController,
  deleteDepartmentController,
  getAllDepartmentController,
  getDepartmentByIDController,
  updateDepartmentByIdController,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get(
  "/",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(getAllDepartmentController)
);

router.post("/create", requireLogin, TryCatch(createDepartmentController));

router.get(
  "/detail/:department_id",
  requireLogin,
  TryCatch(getDepartmentByIDController)
);
router.put(
  "/detail/:department_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(updateDepartmentByIdController)
);

router.delete(
  "/:department_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteDepartmentController)
);

export default router;
