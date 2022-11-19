import express from "express";
import {
  createSchoolController,
  deleteSchoolController,
  getAllSchoolController,
  getSchoolByIDController,
  updateSchoolByIdController,
} from "../controllers/schoolController.js";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(getAllSchoolController)
);

router.post("/create", requireLogin, TryCatch(createSchoolController));
router.get(
  "/detail/:school_id",
  requireLogin,
  TryCatch(getSchoolByIDController)
);
router.put(
  "/detail/:school_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(updateSchoolByIdController)
);

router.delete(
  "/:school_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteSchoolController)
);
export default router;
