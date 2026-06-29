import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
