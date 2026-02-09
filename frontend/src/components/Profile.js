import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@rmsi.com",
    phone: "9876543210",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleUserChange = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });

  const handleUserSave = () => alert("User info updated!");
  const handlePasswordSave = () => {
    if (passwordInfo.new !== passwordInfo.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <FaUserCircle className="text-gray-400 text-8xl" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{userInfo.name}</h1>
          <p className="text-gray-500">{userInfo.email}</p>
          <p className="text-gray-500">{userInfo.phone}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {["info", "password", "tasks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-gray-700 transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            {tab === "info" ? "Personal Info" : tab === "password" ? "Change Password" : "Recent Tasks"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-md rounded-xl p-6">
        {activeTab === "info" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleUserChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleUserSave}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Current Password</label>
              <input
                type="password"
                name="current"
                value={passwordInfo.current}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">New Password</label>
              <input
                type="password"
                name="new"
                value={passwordInfo.new}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                value={passwordInfo.confirm}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handlePasswordSave}
                className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <ul className="space-y-2 text-gray-700">
            {["RMSI-1021 - New Services - QC", "RMSI-1018 - Proposed Main - Production", "RMSI-1015 - New Services - Completed"].map((task, idx) => (
              <li key={idx} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
