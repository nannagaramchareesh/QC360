import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { createTask } from "../controllers/adminController.js";
import { getAllTasks } from "../controllers/adminController.js";
import { assignTask } from "../controllers/adminController.js";
import { userTaskCount } from "../controllers/adminController.js";
import { deleteAllTasks } from "../controllers/adminController.js";
import { deleteAllUsers } from "../controllers/adminController.js";
const router = express.Router();
    
// GET ALL USERS
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/gettasks", protect, isAdmin, getAllTasks);
router.post("/creattask", protect, isAdmin, createTask);
router.put("/assign-task", protect, isAdmin, assignTask);
router.post("/user-task-count", protect, isAdmin, userTaskCount);
router.delete("/deleteTasks", protect, isAdmin, deleteAllTasks);
router.delete("/deleteUsers", protect, isAdmin, deleteAllUsers);

export default router;
