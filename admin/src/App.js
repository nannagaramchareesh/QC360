import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Components */
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Users from "./components/Users";
import Reports from "./components/Reports";
import TaskDetails from "./components/TaskDetails";
import AdminContext from './context/AdminContext'
export const backendUrl = process.env.REACT_APP_BACKEND_URL

/* Context */

export default function App() {
  const context = useContext(AdminContext)
  const isAuthenticated = context.isAuthenticated;
  console.log(context)
  console.log(backendUrl)

  return (
      <div className="min-vh-100 bg-light">

        {isAuthenticated ? (
          <div className="d-flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-grow-1">
              <Navbar />

              <div className="container-fluid mt-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/inventory/:id" element={<TaskDetails />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </div>
            </div>

          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}

      </div>
  );
}
