import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createPredictResultController,
  deletePredictResultController,
  getAllPredictResultController,
  getAllPredictResultSemesterByUserController,
  updatePredictResultByIdController,
} from "../controllers/predictResultController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllPredictResultController));

router.get(
  "/semesters",
  requireLogin,
  TryCatch(getAllPredictResultSemesterByUserController)
);

router.post("/create", requireLogin, TryCatch(createPredictResultController));

router.put(
  "/detail/:predictResult_id",
  requireLogin,
  TryCatch(updatePredictResultByIdController)
);

router.delete(
  "/:predictResult_id",
  requireLogin,
  TryCatch(deletePredictResultController)
);

export default router;
