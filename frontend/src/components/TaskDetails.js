import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App.js";

export default function TaskDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSendBack, setShowSendBack] = useState(false);
    const [qcRemark, setQcRemark] = useState("");

    /* =========================
       Fetch Task From Backend
    ========================== */
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${backendUrl}/api/tasks/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTask(res.data);
            } catch (error) {
                console.error("Error fetching task:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    /* =========================
       Stage Logic
    ========================== */

    const getNextActionText = () => {
        if (!task) return "";

        switch (task.stage?.toLowerCase()) {
            case "production":
                return "Complete work and submit to QC";
            case "qc":
                return "Review work and approve or send back";
            default:
                return "Task completed";
        }
    };

    /* =========================
       Send Back (Frontend only for now)
       (Connect to backend later)
    ========================== */

    const handleSendBack = () => {
        setTask((prev) => ({
            ...prev,
            stage: "Production",
            history: [
                ...prev.history,
                {
                    _id: Date.now(),
                    action: `Sent back to Production: ${qcRemark}`,
                    timestamp: new Date().toISOString(),
                },
            ],
        }));

        setShowSendBack(false);
        setQcRemark("");
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!task) return <p className="p-6">Task not found</p>;

    return (
        <div className="max-w-6xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500">Task Details</p>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {task.workRequestId}
                    </h1>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Back to My Tasks
                </button>
            </div>

            {/* Task Info */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white border rounded-lg">
                <Info label="Work ID" value={task.workRequestId} />
                <Info label="Batch No" value={task.batchNo} />
                <Info label="Task Type" value={task.type} />
                <Info label="Current Stage" value={task.stage} />
                <Info label="Status" value={task.status} />
                <Info
                    label="Created At"
                    value={new Date(task.createdAt).toLocaleDateString()}
                />
                <Info
                    label="Assigned To"
                    value={task.assignedTo?.name || "Unassigned"}
                />
            </div>

            {/* Workflow History */}
            <div className="p-6 bg-white border rounded-lg">
                <h2 className="mb-4 text-lg font-medium text-gray-800">
                    Workflow History
                </h2>

                <div className="space-y-4">
                    {task.history?.map((item) => (
                        <div
                            key={item._id}
                            className="pl-4 border-l-2 border-blue-500"
                        >
                            <p className="font-medium text-gray-700">
                                {item.action}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stage-Based Actions */}
            <div className="flex items-center justify-between p-6 bg-white border rounded-lg">
                <div>
                    <p className="text-sm text-gray-500">Next Action</p>
                    <p className="font-medium text-gray-700">
                        {getNextActionText()}
                    </p>
                </div>

                <div className="flex gap-3">
                    {task.stage === "Production" && (
                        <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Submit to QC
                        </button>
                    )}

                    {task.stage === "QC" && (
                        <>
                            <button
                                onClick={() => setShowSendBack(true)}
                                className="px-4 py-2 text-sm text-red-600 border border-red-500 rounded-md hover:bg-red-50"
                            >
                                Send Back
                            </button>

                            <button className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                                Approve
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Send Back Modal */}
            {showSendBack && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Send Task Back to Production
                        </h2>

                        <p className="text-sm text-gray-500">
                            Please provide the reason for sending this task back.
                        </p>

                        <textarea
                            value={qcRemark}
                            onChange={(e) => setQcRemark(e.target.value)}
                            rows={4}
                            className="w-full p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            placeholder="Describe the QC issue clearly..."
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setShowSendBack(false)}
                                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={qcRemark.trim().length < 10}
                                onClick={handleSendBack}
                                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md disabled:opacity-50"
                            >
                                Send Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* =========================
   Helper Component
========================= */

function Info({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">
                {value || "—"}
            </p>
        </div>
    );
}
