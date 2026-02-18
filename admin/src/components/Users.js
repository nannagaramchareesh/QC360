import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });

  /* ================= FETCH USERS ================= */
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.success) {
        setUsers(data.users);
        fetchTaskCounts(data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH TASK COUNT ================= */
  const fetchTaskCounts = async (usersList) => {
    const counts = {};

    for (let user of usersList) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/user-task-count`, { userId: user._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        counts[user._id] = data.tasks?.length || 0;
      } catch {
        counts[user._id] = 0;
      }
    }

    setTaskCounts(counts);
  };

  useEffect(() => {
    getUsers();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All Roles" ||
        user.roles.includes(roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  /* ================= HANDLE FORM ================= */
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "roles") {
      let updatedRoles = [...formData.roles];
      if (checked) updatedRoles.push(value);
      else updatedRoles = updatedRoles.filter((r) => r !== value);
      setFormData({ ...formData, roles: updatedRoles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateUser = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      formData.roles.length === 0
    ) {
      toast.warning("Fill all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        getUsers();
        toast.success("User created successfully");
      }
      else {
        toast.warning(data.message);
      }
    } catch (err) {
      toast.error("User creation failed");
    }

    setFormData({ name: "", email: "", password: "", roles: [] });
    setShowModal(false);
  };

  /* ================= CALCULATED STATS ================= */
  const totalUsers = users.length;
  const productionCount = users.filter((u) =>
    u.roles.includes("production")
  ).length;
  const qcCount = users.filter((u) =>
    u.roles.includes("qc")
  ).length;
  const totalTasks = Object.values(taskCounts).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="container-fluid p-4">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">User Management</h3>
          <p className="text-muted mb-0">
            Manage production & QC team members
          </p>
        </div>
        <button
          className="btn btn-primary shadow rounded-pill px-4"
          onClick={() => setShowModal(true)}
        >
          + Create User
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="row mb-4">
        <StatCard title="Total Users" value={totalUsers} gradient="linear-gradient(135deg,#667eea,#764ba2)" />
        <StatCard title="Production" value={productionCount} gradient="linear-gradient(135deg,#11998e,#38ef7d)" />
        <StatCard title="QC Team" value={qcCount} gradient="linear-gradient(135deg,#f7971e,#ffd200)" />
        <StatCard title="Total Tasks Assigned" value={totalTasks} gradient="linear-gradient(135deg,#ff416c,#ff4b2b)" />
      </div>

      {/* ================= FILTERS ================= */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select rounded-pill shadow-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>production</option>
              <option>qc</option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100 rounded-pill"
              onClick={() => {
                setSearch("");
                setRoleFilter("All Roles");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Assigned Tasks</th>
                <th>Created At</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="user-row">
                  <td className="fw-semibold">{user.name}</td>
                  <td className="text-muted">{user.email}</td>

                  <td>
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`badge me-1 ${role === "production"
                          ? "bg-success"
                          : "bg-warning text-dark"
                          }`}
                      >
                        {role}
                      </span>
                    ))}
                  </td>

                  <td>
                    <span className="badge bg-primary rounded-pill px-3">
                      {taskCounts[user._id] || 0}
                    </span>
                  </td>

                  <td className="text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>


                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="modal-backdrop-custom"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",   // ✅ vertical center
            justifyContent: "center", // ✅ horizontal center
            zIndex: 9999,
          }}
        >
          <div
            className="modal-box"
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h5 className="fw-bold mb-4">Create New User</h5>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-3 rounded-pill"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control mb-3 rounded-pill"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control mb-3 rounded-pill"
              placeholder="Temporary Password"
            />

            <div className="mb-3">
              <label className="fw-semibold mb-2">Roles</label>
              <div className="d-flex gap-3">
                {["production", "qc"].map((role) => (
                  <div key={role} className="form-check">
                    <input
                      type="checkbox"
                      name="roles"
                      value={role}
                      checked={formData.roles.includes(role)}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-pill"
                onClick={handleCreateUser}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, gradient }) {
  return (
    <div className="col-md-3 mb-3">
      <div
        className="card border-0 shadow rounded-4 stat-card"
        style={{
          background: gradient,
          color: "white",
        }}
      >
        <div className="card-body">
          <p className="mb-1 opacity-75 small text-uppercase">
            {title}
          </p>
          <h2 className="fw-bold mb-0">{value}</h2>
        </div>
      </div>
    </div>
  );
}
