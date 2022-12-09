import express from "express";
import {
  createSubjectScoreController,
  deleteSubjectScoreController,
  getAllSubjectScoreByUserController,
  getAllSubjectScoreController,
  getAllSubjectScoreSemesterByUserController,
  getCPAScoreRecommendationController,
  getGPAScoreRecommendationController,
  getSubjectScoreByIDController,
  updateSubjectScoreByIdController,
} from "../controllers/subjectScoreController.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import { TryCatch } from "../middlewares/errorHandle.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllSubjectScoreController));

router.post("/create", requireLogin, TryCatch(createSubjectScoreController));

router.get(
  "/user/:user_id",
  requireLogin,
  TryCatch(getAllSubjectScoreByUserController)
);
router.get(
  "/semesters",
  requireLogin,
  TryCatch(getAllSubjectScoreSemesterByUserController)
);

router.get(
  "/recommend/gpa",
  requireLogin,
  TryCatch(getGPAScoreRecommendationController)
);

router.get(
  "/recommend/cpa",
  requireLogin,
  TryCatch(getCPAScoreRecommendationController)
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
