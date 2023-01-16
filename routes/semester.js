import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createSemesterController,
  deleteSemesterController,
  getAllSemesterController,
  updateSemesterByIdController,
} from "../controllers/semesterController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllSemesterController));

router.post("/create", requireLogin, TryCatch(createSemesterController));

router.put(
  "/detail/:semester_id",
  requireLogin,
  TryCatch(updateSemesterByIdController)
);

router.delete(
  "/:semester_id",
  requireLogin,
  TryCatch(deleteSemesterController)
);

export default router;
