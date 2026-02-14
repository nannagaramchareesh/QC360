import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Remove "Bearer " if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];  // take the actual token
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};



export const isAdmin = (req, res, next) => {
  if (!req.user.role.includes("Admin")) {
    return res.status(403).json({
      message: "Admin access required",
    });
  }
  next();
};
