import express from "express";
import { TryCatch } from "../middlewares/errorHandle.js";
import { requireLogin, requireRole } from "../middlewares/auth.js";
import {
  createPostController,
  deletePostController,
  getAllPostByTagIDController,
  getAllPostByUserIDController,
  getAllPostController,
  getPostByIDController,
  updatePostByIdController,
  uploadPostImageController,
  uploadPostImageControllerByID,
} from "../controllers/postController.js";
import { postStore } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", requireLogin, TryCatch(getAllPostController));

router.post("/create", requireLogin, TryCatch(createPostController));

router.post(
  "/upload",
  requireLogin,
  postStore.single("post_image"),
  TryCatch(uploadPostImageController)
);

router.post(
  "/upload/:post_id",
  requireLogin,
  postStore.single("post_image"),
  TryCatch(uploadPostImageControllerByID)
);

router.get("/detail/:post_id", requireLogin, TryCatch(getPostByIDController));
router.get(
  "/user/:user_id",
  requireLogin,
  TryCatch(getAllPostByUserIDController)
);
router.post("/tag", requireLogin, TryCatch(getAllPostByTagIDController));
router.put(
  "/detail/:post_id",
  requireLogin,
  TryCatch(updatePostByIdController)
);

router.delete("/:post_id", requireLogin, TryCatch(deletePostController));

export default router;
