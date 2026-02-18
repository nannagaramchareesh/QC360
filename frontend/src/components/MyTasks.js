import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyTasks() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(tasks)
    // 🔹 Fetch My Tasks
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:5000/api/tasks/my-tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Fetched tasks:", res.data.tasks);
            setTasks(res.data.tasks || []);
        } catch (error) {
            console.error("Error fetching tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 🔹 Summary Counts
    const pendingCount = tasks.filter(t => t.status === "pending").length;
    const progressCount = tasks.filter(t => t.status === "in_progress").length;
    const returnedCount = tasks.filter(t => t.status === "sent_back").length;

    const today = new Date().toISOString().split("T")[0];
    const dueToday = tasks.filter(t => t.dueDate === today).length;

    return (
        <div className="min-h-screen p-6 space-y-8 bg-gray-50">

            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                    <p className="mt-1 text-gray-500">Tasks assigned to you</p>
                </div>

                <span className="px-5 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full shadow-md">
                    Production
                </span>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <SummaryCard title="Pending" value={pendingCount} color="yellow" />
                <SummaryCard title="In Progress" value={progressCount} color="blue" />
                <SummaryCard title="Returned" value={returnedCount} color="red" />
                <SummaryCard title="Due Today" value={dueToday} color="green" />
            </div>

            {/* Table */}
           
<div className="overflow-x-auto border border-gray-200 shadow-lg rounded-2xl bg-white">
    <table className="w-full text-sm border-collapse">

        {/* HEADER */}
        <thead className="text-xs tracking-wider text-gray-600 uppercase bg-gray-100">
            <tr>
                <th className="px-6 py-4 text-left">Work ID</th>
                <th className="px-6 py-4 text-left">Batch</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Stage</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Created</th>
                <th className="px-6 py-4 text-left">Action</th>
            </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">
            {loading ? (
                <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                        Loading tasks...
                    </td>
                </tr>
            ) : tasks.length === 0 ? (
                <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                        No tasks assigned
                    </td>
                </tr>
            ) : (
                tasks.map((task, index) => (
                    <tr
                        key={task.workRequestId}
                        className={`transition hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                        {/* Work ID */}
                        <td className="px-6 py-4 font-semibold text-gray-800">
                            {task.workRequestId}
                        </td>

                        {/* Batch */}
                        <td className="px-6 py-4 text-gray-700">
                            {task.batchNo}
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4 text-gray-700">
                            {task.type}
                        </td>

                        {/* Stage */}
                        <td className="px-6 py-4">
                            <StageBadge stage={task.stage} />
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                            <StatusBadge status={task.status} />
                        </td>

                        {/* Created Date */}
                        <td className="px-6 py-4 text-gray-600">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                            <Link
                                to={`/tasks/${task._id}`}
                                className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>

        </div>
    );
}

/* ---------- Components ---------- */

function SummaryCard({ title, value, color }) {
    const colors = {
        yellow: "bg-yellow-50 text-yellow-800",
        blue: "bg-blue-50 text-blue-800",
        red: "bg-red-50 text-red-800",
        green: "bg-green-50 text-green-800",
    };

    return (
        <div className={`p-5 rounded-xl shadow-lg border ${colors[color]}`}>
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {

    const map = {
        Pending: "Pending",
        "In Progress": "In Progress",
        Completed: "Completed"
    };

    const styles = {
        Pending: "bg-yellow-100 text-yellow-800",
        "In Progress": "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
            {map[status]}
        </span>
    );
}

function StageBadge({ stage }) {
    const styles = {
        Production: "bg-purple-100 text-purple-800",
        QC: "bg-indigo-100 text-indigo-800",
        Completed: "bg-green-100 text-green-800",
        "As-Built Review": "bg-blue-100 text-blue-800",
    };

    const map = {
        Production: "Production",
        QC: "QC",
        Completed: "Completed",
        "As-Built Review": "As-Built Review",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[stage]}`}>
            {map[stage]}
        </span>
    );
}

