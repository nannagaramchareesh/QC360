import express from "express";
import { getMyTasks } from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getTaskById } from "../controllers/taskController.js";
const router = express.Router();


router.get("/my-tasks", protect, getMyTasks);
router.get("/:id", protect, getTaskById);
export default router;