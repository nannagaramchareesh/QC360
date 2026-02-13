import React from "react";
import axios from "axios";
import { useState } from "react";
import {backendUrl} from '../App'
import { useContext } from "react";
import AdminContext from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AdminContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/admin/login`,{email,password})
      console.log(data)
      if(data.success){
        alert("login successful")
        login(data.token);
        navigate('/')
      }
      else{
        alert("invalid credentials")
      }
    } catch (error) {
      alert("login failed")
    }
  }
  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg border-0 admin-login-card">
        <div className="row g-0">

          {/* Left Branding Section */}
          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-5 text-white branding-side">
            <h2 className="fw-bold mb-3">QC360 Admin</h2>
            <p className="mb-4 opacity-75">
              Centralized control for task inventory, workflow tracking,
              and team productivity.
            </p>

            <ul className="list-unstyled small">
              <li className="mb-2">✔ Task Inventory Management</li>
              <li className="mb-2">✔ User Assignment & Tracking</li>
              <li className="mb-2">✔ Workflow & SLA Monitoring</li>
              <li>✔ Secure Admin Access</li>
            </ul>
          </div>

          {/* Login Form */}
          <div className="col-md-6 p-5">
            <h4 className="fw-bold mb-2">Admin Login</h4>
            <p className="text-muted mb-4">
              Sign in to access the admin control panel
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  className="form-control"
                  placeholder="admin@company.com"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                Login
              </button>
            </form>

            <p className="text-center text-muted small mt-4">
              Authorized personnel only
            </p>
          </div>

        </div>
      </div>

      {/* Inline Styles (Admin-only polish) */}
      <style>{`
        .admin-login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .admin-login-card {
          width: 900px;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
        }

        .branding-side {
          background: linear-gradient(160deg, #0f2027, #203a43, #2c5364);
        }

        .form-control {
          border-radius: 8px;
          padding: 10px 12px;
        }

        .btn-primary {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
