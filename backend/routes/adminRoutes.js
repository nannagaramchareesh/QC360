import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// GET ALL USERS
router.get("/users", protect, getAllUsers);
//LOGIN

export default router;
