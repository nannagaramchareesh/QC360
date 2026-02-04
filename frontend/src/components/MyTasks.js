import React from "react";
import { Link } from "react-router-dom";
const dummyTasks = [
    {
        id: "RMSI-1021",
        batch: "BATCH-01",
        type: "Proposed Main",
        stage: "Production",
        status: "Pending",
        dueDate: "2026-02-05",
    },
    {
        id: "RMSI-1025",
        batch: "BATCH-02",
        type: "New Service",
        stage: "QC",
        status: "In Progress",
        dueDate: "2026-02-06",
    },
    {
        id: "RMSI-1030",
        batch: "BATCH-03",
        type: "Replacement Service",
        stage: "Delivery",
        status: "Completed",
        dueDate: "2026-02-03",
    },
];

export default function MyTasks() {
    return (
        <div className="min-h-screen p-6 space-y-8 bg-gray-50">

            {/* Page Header */}
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                    <p className="mt-1 text-gray-500">Tasks assigned to you</p>
                </div>

                <span className="px-5 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full shadow-md">
                    Production
                </span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <SummaryCard title="Pending" value="4" color="yellow" />
                <SummaryCard title="In Progress" value="2" color="blue" />
                <SummaryCard title="Returned" value="1" color="red" />
                <SummaryCard title="Due Today" value="1" color="green" />
            </div>

            {/* Filters */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <select className="px-4 py-2 transition border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option>Status: All</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Returned</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by Task ID or Batch"
                    className="w-full px-4 py-2 transition border rounded-md shadow-sm sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto border border-gray-200 shadow-lg rounded-xl bg-gradient-to-b from-white to-gray-50">
                <table className="w-full text-sm border-collapse">
                    <thead className="text-xs tracking-wider text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Task ID</th>
                            <th className="px-6 py-3 text-left">Batch Number</th>
                            <th className="px-6 py-3 text-left">Task Type</th>
                            <th className="px-6 py-3 text-left">Stage</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Due Date</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {dummyTasks.map((task, index) => (
                            <tr
                                key={task.id}
                                className={`transition hover:shadow-lg hover:bg-blue-50 rounded-lg ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">{task.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{task.batch}</td>
                                <td className="px-6 py-4 text-gray-700">{task.type}</td>
                                <td className="px-6 py-4 text-gray-700">{task.stage}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={task.status} />
                                </td>
                                <td className="px-6 py-4 text-gray-700">{task.dueDate}</td>
                                <td className="px-6 py-4">
                                    <Link to={`/tasks/${task.id}`} className="text-blue-600 hover:underline">
                                        View
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

/* ---------- Helper Components ---------- */

function SummaryCard({ title, value, color }) {
    const colors = {
        yellow: "bg-yellow-50 text-yellow-800",
        blue: "bg-blue-50 text-blue-800",
        red: "bg-red-50 text-red-800",
        green: "bg-green-50 text-green-800",
    };

    return (
        <div className={`p-5 rounded-xl shadow-lg border ${colors[color]} hover:scale-105 transition-transform`}>
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-yellow-100 text-yellow-800",
        "In Progress": "bg-blue-100 text-blue-800",
        Returned: "bg-red-100 text-red-800",
        Completed: "bg-green-100 text-green-800",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]} shadow-sm`}
        >
            {status}
        </span>
    );
}
