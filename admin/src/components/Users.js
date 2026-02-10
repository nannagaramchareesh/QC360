import React, { useState } from "react";

export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);

  const users = [
    {
      name: "Rahul Verma",
      email: "rahul@krijay.com",
      role: "Production",
      tasks: 6,
      status: "Active",
      created: "2026-01-12",
    },
    {
      name: "Anjali Singh",
      email: "anjali@krijay.com",
      role: "QC",
      tasks: 3,
      status: "Active",
      created: "2026-01-20",
    },
    {
      name: "Suresh Kumar",
      email: "suresh@krijay.com",
      role: "Production",
      tasks: 0,
      status: "Inactive",
      created: "2025-12-05",
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">User Management</h3>
          <p className="text-muted mb-0">
            Manage production & QC team members
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Create User
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <StatCard title="Total Users" value="12" color="primary" />
        <StatCard title="Production" value="7" color="success" />
        <StatCard title="QC" value="4" color="warning" />
        <StatCard title="Inactive" value="1" color="secondary" />
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
            />
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Roles</option>
              <option>Production</option>
              <option>QC</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-outline-secondary w-100">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Assigned Tasks</th>
                <th>Status</th>
                <th>Created On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="fw-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {user.role}
                    </span>
                  </td>
                  <td>{user.tasks}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.created}</td>
                  <td className="text-end">
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li className="dropdown-item">View</li>
                        <li className="dropdown-item">Edit</li>
                        <li className="dropdown-item">Reset Password</li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li className="dropdown-item text-danger">
                          Deactivate
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create User</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  placeholder="Full Name"
                />
                <input
                  className="form-control mb-3"
                  placeholder="Email"
                />
                <select className="form-select mb-3">
                  <option>Select Role</option>
                  <option>Production</option>
                  <option>QC</option>
                </select>
                <input
                  className="form-control"
                  placeholder="Temporary Password"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Create User
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

    </div>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className={`card text-white bg-${color} shadow-sm`}>
        <div className="card-body">
          <p className="mb-1">{title}</p>
          <h4 className="fw-bold mb-0">{value}</h4>
        </div>
      </div>
    </div>
  );
}
