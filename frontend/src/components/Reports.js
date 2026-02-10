import React from "react";
import { FaTasks, FaCheckCircle, FaSpinner, FaClipboardList } from "react-icons/fa";

export default function Reports() {
  const summaryData = [
    { label: "Total Tasks", value: 48, icon: <FaTasks className="text-3xl text-white" />, bg: "from-blue-500 to-blue-400" },
    { label: "Production", value: 18, icon: <FaSpinner className="text-3xl text-white" />, bg: "from-purple-500 to-purple-400" },
    { label: "QC", value: 12, icon: <FaClipboardList className="text-3xl text-white" />, bg: "from-yellow-400 to-yellow-300" },
    { label: "Completed", value: 18, icon: <FaCheckCircle className="text-3xl text-white" />, bg: "from-green-500 to-green-400" },
  ];

  const tasks = [
    {
      id: "RMSI-1021",
      name: "City Survey",
      type: "New Services",
      stage: "QC",
      date: "10 Feb 2026",
      status: "In Progress",
    },
    {
      id: "RMSI-1018",
      name: "Pipeline Mapping",
      type: "Proposed Main",
      stage: "Production",
      date: "08 Feb 2026",
      status: "In Progress",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Reports</h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="date" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="date" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All Task Types</option>
          <option>New Services</option>
          <option>Proposed Main</option>
        </select>
        <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All Stages</option>
          <option>Production</option>
          <option>As Built Review</option>
          <option>QC</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`bg-linear-to-r ${item.bg} text-white rounded-xl shadow-lg p-5 flex items-center justify-between hover:scale-105 transform transition`}
          >
            <div>
              <p className="text-sm opacity-80">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md h-64 flex flex-col items-center justify-center text-gray-400 font-semibold">
          Tasks by Stage (Chart Placeholder)
        </div>
        <div className="bg-white rounded-xl shadow-md h-64 flex flex-col items-center justify-center text-gray-400 font-semibold">
          Tasks by Type (Chart Placeholder)
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="p-3 text-left">Task ID</th>
              <th className="p-3 text-left">Task Name</th>
              <th className="p-3 text-left">Task Type</th>
              <th className="p-3 text-left">Stage</th>
              <th className="p-3 text-left">Last Updated</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 cursor-pointer transition">
                <td className="p-3 font-medium">{task.id}</td>
                <td className="p-3">{task.name}</td>
                <td className="p-3">{task.type}</td>
                <td className="p-3">{task.stage}</td>
                <td className="p-3">{task.date}</td>
                <td
                  className={`p-3 font-semibold ${
                    task.status === "Completed" ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {task.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
