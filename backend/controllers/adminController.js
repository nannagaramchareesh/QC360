import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Task from "../models/Task.js";




const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


 const createTask = async (req, res) => {
  try {
    const { workRequestId, batchNo, type } = req.body;

    console.log("Received data for new task:", req.body); // Debugging log
    if (!workRequestId || !batchNo || !type) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check duplicate
    const existing = await Task.findOne({ workRequestId });
    if (existing) {
      return res.json({
        success: false,
        message: "Task already exists",
      });
    }

    const task = await Task.create({
      workRequestId,
      batchNo,
      type,
      history: [
        {
          action: "Task Created",
          user: "Admin",
        },
      ],
    });

    res.json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

 const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



export {getAllUsers, createTask, getAllTasks};