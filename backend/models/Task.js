import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  action: String,
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema(
  {
    workRequestId: {
      type: String,
      required: true,
      unique: true,
    },

    batchNo: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["New Services", "Proposed Mains", "New Business Mains", "Replacement Services"],
      required: true,
    },

    // workflow fields
    stage: {
      type: String,
      enum: ["Unassigned", "Production", "QC", "Completed"],
      default: "Unassigned",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    history: [historySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
