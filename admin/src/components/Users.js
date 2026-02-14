import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const { data } = await axios.get(`${backendUrl}/api/admin/users`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (data.success) {
      setUsers(data.users);
    } else {
      alert("Error fetching users: " + data.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  // Sample users

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "roles") {
      let updatedRoles = [...formData.roles];
      if (checked) {
        updatedRoles.push(value);
      } else {
        updatedRoles = updatedRoles.filter((r) => r !== value);
      }
      setFormData({ ...formData, roles: updatedRoles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleCreateUser = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      formData.roles.length === 0
    ) {
      alert("Please fill all fields and select at least one role.");
      return;
    }

    const { data } = await axios.post(
      `${backendUrl}/api/auth/register`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (data.success) {
      alert("User created successfully!");
      getUsers(); // Refresh user list
    }
    else {
      alert("Error creating user: " + data.message);
    }
    // Reset form and close modal
    setFormData({ name: "", email: "", password: "", roles: [] });
    setShowModal(false);
  };

  return (
    <div className="container-fluid p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">User Management</h3>
          <p className="text-muted mb-0">Manage production & qc team members</p>
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
        <StatCard title="Total Users" value={users.length} color="primary" />
        <StatCard title="production" value={users.filter(u => u.roles.includes("production")).length} color="success" />
        <StatCard title="qc" value={users.filter(u => u.roles.includes("qc")).length} color="warning" />
        <StatCard title="Inactive" value={users.filter(u => u.status === "Inactive").length} color="secondary" />
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
              <option>production</option>
              <option>qc</option>
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
            <button className="btn btn-outline-secondary w-100">Reset</button>
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
                <th>Roles</th>
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
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="badge bg-info text-dark me-1"
                      >
                        {role}
                      </span>
                    ))}
                  </td>
                  <td>{user.tasks}</td>
                  <td>
                    <span
                      className={`badge ${user.status === "Active" ? "bg-success" : "bg-secondary"
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
                        <li className="dropdown-item text-danger">Deactivate</li>
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
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1050 }}
        >
          <div className="bg-light rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: "600px", border: "2px solid #f0f0f0" }}>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-3 text-primary">
                  <i className="bi bi-person-plus-fill"></i> {/* Bootstrap icon */}
                </span>
                <h5 className="fw-bold mb-0">Create New User</h5>
              </div>
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            {/* Body */}
            <div className="mb-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control mb-3 rounded-pill border-1 shadow-sm"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-3 rounded-pill border-1 shadow-sm"
                placeholder="Email"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control mb-3 rounded-pill border-1 shadow-sm"
                placeholder="Temporary Password"
                type="password"
              />

              {/* Roles */}
              <div className="mb-3">
                <label className="form-label fw-semibold mb-2">Select Roles</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="production"
                      name="roles"
                      checked={formData.roles.includes("production")}
                      onChange={handleChange}
                      id="roleproduction"
                    />
                    <label className="form-check-label" htmlFor="roleproduction">
                      <span className="badge bg-success">production</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="qc"
                      name="roles"
                      checked={formData.roles.includes("qc")}
                      onChange={handleChange}
                      id="roleqc"
                    />
                    <label className="form-check-label" htmlFor="roleqc">
                      <span className="badge bg-warning text-dark">qc</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
                onClick={() => setShowModal(false)}
                style={{ transition: "all 0.2s" }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
                onClick={handleCreateUser}
                style={{ background: "linear-gradient(90deg, #4e8ef7, #6ab4ff)", border: "none", transition: "all 0.2s" }}
              >
                <i className="bi bi-check-circle-fill me-1"></i> Create User
              </button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
}

/* ---------- Helpers ---------- */
function StatCard({ title, value, color }) {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card text-white bg-${color} shadow-sm`}>
        <div className="card-body">
          <p className="mb-1">{title}</p>
          <h4 className="fw-bold mb-0">{value}</h4>
        </div>
      </div>
    </div>
  );
}
