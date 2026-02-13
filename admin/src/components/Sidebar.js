import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaTasks,
  FaFileUpload,
  FaUsers,
  FaExchangeAlt,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import AdminContext from "../context/AdminContext";

export default function Sidebar() {
  const {logout} = useContext(AdminContext);
  const handleLogout = () => {
    logout();
  }
  return (
    <div
      className="d-flex flex-column p-3 text-white"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e3c72, #2a5298)",
        boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo / Brand */}
      <div className="mb-4 text-center">
        <h4 className="fw-bold mb-0">QC360</h4>
        <small className="text-light opacity-75">
          Admin Console
        </small>
      </div>

      <hr className="border-light opacity-50" />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-2">

        <SidebarItem to="/" icon={<FaChartLine />} label="Dashboard" />

        <SidebarItem
          to="/inventory"
          icon={<FaTasks />}
          label="Inventory"
        />

      

        <SidebarItem
          to="/users"
          icon={<FaUsers />}
          label="Users"
        />

      

        <SidebarItem
          to="/reports"
          icon={<FaFileAlt />}
          label="Reports"
        />
      </ul>

      {/* Spacer */}
      <div className="mt-auto">
        <hr className="border-light opacity-50" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

/* ---------- Helper Component ---------- */

function SidebarItem({ to, icon, label }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded ${
            isActive
              ? "bg-white text-primary fw-semibold shadow-sm"
              : "text-white opacity-90"
          }`
        }
      >
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
