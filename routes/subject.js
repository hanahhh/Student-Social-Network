import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  addCommentSubjectController,
  createSubjectController,
  deleteSubjectController,
  getAllSubjectController,
  getSubjectByIDController,
  updateSubjectByIdController,
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllSubjectController));

router.post("/create", requireLogin, TryCatch(createSubjectController));
router.put(
  "/comments/:subject_id",
  requireLogin,
  TryCatch(addCommentSubjectController)
);

router.get(
  "/detail/:subject_id",
  requireLogin,
  TryCatch(getSubjectByIDController)
);
router.put(
  "/detail/:subject_id",
  requireLogin,
  TryCatch(updateSubjectByIdController)
);

router.delete(
  "/:subject_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteSubjectController)
);

export default router;
