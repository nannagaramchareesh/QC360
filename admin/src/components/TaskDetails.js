import React from "react";

export default function AdminTaskDetails() {
  const task = {
    id: "RMSI-2045",
    project: "Hyderabad Water Board",
    client: "Govt of Telangana",
    type: "New Services",
    priority: "High",
    stage: "QC",
    status: "In Progress",
    assignedTo: "Anjali Singh",
    role: "QC",
    createdBy: "Admin",
    createdOn: "2026-01-28",
    dueDate: "2026-02-05",
    description:
      "Digitization and QC verification of new service connections for Hyderabad region.",
    workflow: [
      {
        stage: "Production",
        user: "Rahul Verma",
        date: "2026-01-30",
        status: "Completed",
        remark: "Digitization completed",
      },
      {
        stage: "QC",
        user: "Anjali Singh",
        date: "2026-02-02",
        status: "In Progress",
        remark: "QC ongoing",
      },
      {
        stage: "As-Built Review",
        status: "Pending",
      },
    ],
  };

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p className="text-muted mb-1">Task Details</p>
          <h3 className="fw-bold">{task.id}</h3>
          <span className="badge bg-danger me-2">{task.priority}</span>
          <span className="badge bg-info text-dark">{task.stage}</span>
        </div>

        <div>
          <button className="btn btn-outline-secondary me-2">
            Reassign Task
          </button>
          <button className="btn btn-outline-danger">
            Override Stage
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <Info label="Project" value={task.project} />
            <Info label="Client" value={task.client} />
            <Info label="Task Type" value={task.type} />
            <Info label="Assigned To" value={task.assignedTo} />
            <Info label="Role" value={task.role} />
            <Info label="Status" value={task.status} />
            <Info label="Created By" value={task.createdBy} />
            <Info label="Created On" value={task.createdOn} />
            <Info label="Due Date" value={task.dueDate} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-2">Task Description</h5>
          <p className="text-muted mb-0">{task.description}</p>
        </div>
      </div>

      {/* Workflow Timeline */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-4">Workflow Progress</h5>

          <div className="timeline">
            {task.workflow.map((step, index) => (
              <div key={index} className="d-flex mb-4">
                <div className="me-3">
                  <div
                    className={`rounded-circle ${
                      step.status === "Completed"
                        ? "bg-success"
                        : step.status === "In Progress"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                    style={{ width: 14, height: 14 }}
                  ></div>
                </div>

                <div>
                  <h6 className="mb-1">{step.stage}</h6>
                  {step.user && (
                    <p className="mb-0 text-muted">
                      {step.user} • {step.date}
                    </p>
                  )}
                  {step.remark && (
                    <p className="mb-0 text-muted small">
                      {step.remark}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted mb-1">Admin Controls</p>
            <h6 className="mb-0">Manage task state & ownership</h6>
          </div>

          <div>
            <button className="btn btn-outline-warning me-2">
              Send Back
            </button>
            <button className="btn btn-success me-2">
              Mark Completed
            </button>
            <button className="btn btn-secondary">
              Put On Hold
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ---------- Helper ---------- */

function Info({ label, value }) {
  return (
    <div className="col-md-4">
      <p className="text-muted small mb-1">{label}</p>
      <p className="fw-medium mb-0">{value}</p>
    </div>
  );
}
