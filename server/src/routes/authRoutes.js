import express from "express";
import {
  loginUser,
  changePassword,
  getMe,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.patch("/change-password", verifyToken, changePassword);
router.get("/me", verifyToken, getMe);

export default router;
