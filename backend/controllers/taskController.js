import Task from "../models/Task.js";
// controllers/taskController.js

const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;   // comes from auth middleware

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

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "name email");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export { getMyTasks, getTaskById };