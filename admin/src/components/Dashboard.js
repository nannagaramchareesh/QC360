import React from "react";
import {
  FaTasks,
  FaTools,
  FaCheckCircle,
  FaBug,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="container-fluid">

      {/* Page Title */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark">Overview</h3>
        <p className="text-muted mb-0">
          Operational status across all projects
        </p>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <StatCard
          title="Total Tasks"
          value="1,248"
          icon={<FaTasks />}
          color="primary"
        />
        <StatCard
          title="In Production"
          value="312"
          icon={<FaTools />}
          color="warning"
        />
        <StatCard
          title="In QC"
          value="96"
          icon={<FaBug />}
          color="info"
        />
        <StatCard
          title="Completed"
          value="840"
          icon={<FaCheckCircle />}
          color="success"
        />
      </div>

      {/* Workflow Pipeline */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-4">Workflow Pipeline</h5>

          <div className="row text-center">
            <PipelineStep
              title="As-Built Review"
              count={124}
              color="secondary"
            />
            <PipelineArrow />
            <PipelineStep
              title="Production"
              count={312}
              color="warning"
            />
            <PipelineArrow />
            <PipelineStep
              title="QC"
              count={96}
              color="info"
            />
            <PipelineArrow />
            <PipelineStep
              title="Completed"
              count={840}
              color="success"
            />
          </div>
        </div>
      </div>

      {/* Alerts & Insights */}
      <div className="row g-4">

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                <FaExclamationTriangle className="text-danger me-2" />
                Attention Required
              </h5>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  14 tasks stuck in Production for more than 3 days
                </li>
                <li className="list-group-item">
                  6 high priority tasks nearing due date
                </li>
                <li className="list-group-item">
                  9 tasks sent back by QC today
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Performance Snapshot
              </h5>

              <p className="mb-2">
                Average task completion time:
                <strong className="ms-2">2.4 days</strong>
              </p>
              <p className="mb-2">
                QC rejection rate:
                <strong className="ms-2 text-danger">7.2%</strong>
              </p>
              <p className="mb-0">
                On-time delivery rate:
                <strong className="ms-2 text-success">93%</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-xl-3 col-md-6">
      <div className={`card text-white bg-${color} shadow-sm`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-1 text-uppercase small opacity-75">
              {title}
            </p>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
          <div style={{ fontSize: "2.5rem", opacity: 0.8 }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({ title, count, color }) {
  return (
    <div className="col">
      <div className={`card border-${color} shadow-sm`}>
        <div className="card-body">
          <h6 className="fw-semibold mb-1">{title}</h6>
          <span className={`badge bg-${color}`}>
            {count} Tasks
          </span>
        </div>
      </div>
    </div>
  );
}

function PipelineArrow() {
  return (
    <div className="col-auto d-flex align-items-center">
      <span className="fs-3 text-muted">→</span>
    </div>
  );
}
