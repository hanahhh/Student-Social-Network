import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createTagController,
  deleteTagController,
  getAllTagController,
  getTagByIDController,
  updateTagByIdController,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllTagController));

router.post("/create", requireLogin, TryCatch(createTagController));

router.get("/detail/:tag_id", requireLogin, TryCatch(getTagByIDController));
router.put("/detail/:tag_id", requireLogin, TryCatch(updateTagByIdController));

router.delete("/:tag_id", requireLogin, TryCatch(deleteTagController));

export default router;
