import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Directly read token (no Bearer split)
    const token = req.headers.authorization; 

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};
