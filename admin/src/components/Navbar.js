import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Left Section */}
      <div className="d-flex align-items-center gap-3">
        <h5 className="mb-0 fw-semibold text-primary">
          Admin Dashboard
        </h5>
      </div>

      {/* Right Section */}
      <div className="ms-auto d-flex align-items-center gap-4">

        {/* Notifications */}
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
        >
          <FaBell size={18} className="text-secondary" />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.65rem" }}
          >
            3
          </span>
        </div>

        {/* Divider */}
        <div
          className="vr"
          style={{ height: "28px" }}
        />

        {/* Profile */}
        <div className="dropdown">
          <button
            className="btn d-flex align-items-center gap-2 p-0 border-0 bg-transparent"
            data-bs-toggle="dropdown"
          >
            <FaUserCircle size={28} className="text-primary" />

            <div className="text-start">
              <p className="mb-0 fw-medium text-dark">
                Admin User
              </p>
              <small className="text-muted">
                System Administrator
              </small>
            </div>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <button className="dropdown-item">
                Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                Settings
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger">
                Logout
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
