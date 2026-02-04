import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskDetails() {
    const navigate = useNavigate();
    const [showSendBack, setShowSendBack] = useState(false);
    const [qcRemark, setQcRemark] = useState("");

    const task = {
        id: "RMSI-1021",
        project: "Hyderabad Water Board",
        client: "Government of Telangana",
        type: "New Servics", // Proposed Main | New Services
        stage: "QC", // As-Built Review | Production | QC | Completed
        status: "In Progress",
        priority: "High",
        dueDate: "2026-02-05",
        description:
            "Digitization and validation of pipeline data for Hyderabad Water Board region.",
        assignedTo: "You",
    };


    /* ---------- Stage-Based Helper ---------- */

    const getWorkflowHistory = () => {
        if (task.type === "New Services") {
            if (task.stage === "As-Built Review")
                return ["As-Built Review"];

            if (task.stage === "Production")
                return ["As-Built Review", "Production"];

            if (task.stage === "QC")
                return ["As-Built Review", "Production"];

            if (task.stage === "Completed")
                return ["As-Built Review", "Production", "QC"];
        }

        // Proposed Main / others
        if (task.stage === "Production")
            return ["Production"];

        if (task.stage === "QC")
            return ["Production"];

        if (task.stage === "Completed")
            return ["Production", "QC"];

        return [];
    };


    const getNextActionText = () => {
        if (task.stage === "Production")
            return "Complete work and submit to QC";

        if (task.stage === "QC")
            return "Review work and approve or send back";

        return "Task completed";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500">Task Details</p>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {task.id}
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
                <Info label="Project" value={task.project} />
                <Info label="Client" value={task.client} />
                <Info label="Task Type" value={task.type} />
                <Info label="Current Stage" value={task.stage} />
                <Info label="Status" value={task.status} />
                <Info label="Priority" value={task.priority} />
                <Info label="Due Date" value={task.dueDate} />
                <Info label="Assigned To" value={task.assignedTo} />
            </div>

            {/* Description */}
            <div className="p-6 bg-white border rounded-lg">
                <h2 className="mb-2 text-lg font-medium text-gray-800">
                    Task Description
                </h2>
                <p className="text-sm text-gray-600">
                    {task.description}
                </p>
            </div>

            {/* Workflow History */}
            <div className="p-6 bg-white border rounded-lg">
                <h2 className="mb-4 text-lg font-medium text-gray-800">
                    Workflow History
                </h2>

                <div className="space-y-4">
                    {getWorkflowHistory().map((stage, index) => (
                        <div
                            key={index}
                            className="pl-4 border-l-2 border-blue-500"
                        >
                            <p className="font-medium text-gray-700">{stage}</p>
                            <p className="text-sm text-gray-500">
                                {stage === task.stage ? "Current Stage" : "Completed"}
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
                    {/* Production */}
                    {task.stage === "Production" && (
                        <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Submit to QC
                        </button>
                    )}

                    {/* QC */}
                    {task.stage === "QC" && (
                        <>
                            <button
                                onClick={() => setShowSendBack(true)}
                                className="px-4 py-2 text-sm text-red-600 border border-red-500 rounded-md hover:bg-red-50"
                            >
                                Send Back
                            </button>

                            <button
                                className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                            >
                                Approve
                            </button>
                        </>
                    )}

                </div>
            </div>

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
                                disabled={qcRemark.trim().length < 15}
                                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md disabled:opacity-50"
                                onClick={() => {
                                    // stage transition
                                    task.stage = "Production";
                                    setShowSendBack(false);
                                    setQcRemark("");
                                }}
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

/* ---------- Helper ---------- */



function Info({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    );
}
