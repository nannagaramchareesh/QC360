import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { createTask } from "../controllers/adminController.js";
import { getAllTasks } from "../controllers/adminController.js";
import { assignTask } from "../controllers/adminController.js";

const router = express.Router();
    
// GET ALL USERS
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/gettasks", protect, isAdmin, getAllTasks);
router.post("/creattask", protect, isAdmin, createTask);
router.put("/assign-task", protect, isAdmin, assignTask);
export default router;
