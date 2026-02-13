import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {login} from "../controllers/adminController.js"
const router = express.Router();

// GET ALL USERS
router.get("/users", getAllUsers);
//LOGIN
router.post('/login',login);

export default router;
