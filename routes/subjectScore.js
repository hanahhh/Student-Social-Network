import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createSubjectScoreController,
  deleteSubjectScoreController,
  getAllSubjectScoreByUserController,
  getAllSubjectScoreController,
  getSubjectScoreByIDController,
  updateSubjectScoreByIdController,
} from "../controllers/subjectScoreController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllSubjectScoreController));

router.post("/create", requireLogin, TryCatch(createSubjectScoreController));

router.get(
  "/:user_id",
  requireLogin,
  TryCatch(getAllSubjectScoreByUserController)
);

router.get(
  "/detail/:subjectScore_id",
  requireLogin,
  TryCatch(getSubjectScoreByIDController)
);
router.put(
  "/detail/:subjectScore_id",
  requireLogin,
  TryCatch(updateSubjectScoreByIdController)
);

router.delete(
  "/:subjectScore_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteSubjectScoreController)
);

export default router;
