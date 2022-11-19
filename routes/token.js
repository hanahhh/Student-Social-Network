import express from "express";
import { refreshTokenController } from "../controllers/tokenController.js";
import { TryCatch } from "../middlewares/errorHandle.js";

const router = express.Router();

router.post("/refresh", TryCatch(refreshTokenController));
export default router;
