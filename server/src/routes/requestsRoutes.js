import express from "express";
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestsController.js";

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.patch("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
