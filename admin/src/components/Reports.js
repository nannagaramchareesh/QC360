import React from "react";

export default function AdminReports() {
  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Reports</h3>
          <p className="text-muted mb-0">
            Operational insights & performance overview
          </p>
        </div>

        <select className="form-select w-auto">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <Kpi title="Total Tasks" value="1,248" color="primary" />
        <Kpi title="Completed" value="982" color="success" />
        <Kpi title="Avg TAT (Days)" value="2.6" color="info" />
        <Kpi title="Sent Back (QC)" value="134" color="danger" />
      </div>

      {/* Productivity Overview */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">
                Tasks by Workflow Stage
              </h6>

              <Progress label="Production" value={65} color="primary" />
              <Progress label="QC" value={25} color="warning" />
              <Progress label="Completed" value={10} color="success" />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">
                Tasks by Task Type
              </h6>

              <Progress label="New Services" value={55} color="info" />
              <Progress label="Proposed Mains" value={45} color="secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Team Performance</h6>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Assigned</th>
                  <th>Completed</th>
                  <th>Avg TAT</th>
                  <th>QC Rejections</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anjali Singh</td>
                  <td>QC</td>
                  <td>120</td>
                  <td>102</td>
                  <td>2.1 days</td>
                  <td className="text-danger fw-semibold">14</td>
                </tr>
                <tr>
                  <td>Rahul Verma</td>
                  <td>Production</td>
                  <td>150</td>
                  <td>138</td>
                  <td>2.4 days</td>
                  <td className="text-success fw-semibold">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottlenecks */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">
            Bottlenecks & Delays
          </h6>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span>QC Stage Delays</span>
              <span className="badge bg-danger">High</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>New Services As-Built Review</span>
              <span className="badge bg-warning">Medium</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Unassigned Tasks</span>
              <span className="badge bg-info">Low</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

/* ---------- Helpers ---------- */

function Kpi({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className={`card shadow-sm border-start border-4 border-${color}`}>
        <div className="card-body">
          <p className="text-muted mb-1">{title}</p>
          <h4 className="fw-bold mb-0">{value}</h4>
        </div>
      </div>
    </div>
  );
}

function Progress({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between mb-1">
        <span className="small">{label}</span>
        <span className="small">{value}%</span>
      </div>
      <div className="progress">
        <div
          className={`progress-bar bg-${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
