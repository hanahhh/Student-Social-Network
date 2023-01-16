import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryByIDController,
  updateCategoryByIdController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllCategoryController));

router.post("/create", requireLogin, TryCatch(createCategoryController));

router.get(
  "/detail/:category_id",
  requireLogin,
  TryCatch(getCategoryByIDController)
);
router.put(
  "/detail/:category_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(updateCategoryByIdController)
);

router.delete(
  "/:category_id",
  requireLogin,
  requireRole(["ADMIN"]),
  TryCatch(deleteCategoryController)
);

export default router;
