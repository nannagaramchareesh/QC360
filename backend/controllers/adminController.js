import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Task from "../models/Task.js";




const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      roles: { $nin: ["admin"] }   // 👈 exclude admin users
    }).select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
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

const assignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    // assign user
    task.assignedTo = userId;
    task.status = "In Progress";

    // 🔥 SET INITIAL STAGE BASED ON TYPE
    if (task.type === "New Services") {
      task.stage = "As-Built Review";
    } else {
      task.stage = "Production";
    }

    // ✅ PUSH TO HISTORY
    task.history.push({
      action: "Task Assigned",
      performedBy: req.user._id,   // logged-in admin
    });

    await task.save();

    res.json({
      success: true,
      message: "Task assigned successfully",
      task,
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error assigning task" });
  }
};



const userTaskCount = async (req, res) => {
  try {
    const { userId } = req.body

    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All tasks deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Tasks Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting tasks",
    });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({
      roles: { $nin: ["admin"] }
    });

    return res.status(200).json({
      success: true,
      message: "All users deleted successfully (except admin)",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting users",
    });
  }
};





export { getAllUsers, createTask, getAllTasks, assignTask, userTaskCount, deleteAllTasks, deleteAllUsers };