import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AdminTaskDetails() {
  const { id } = useParams();
  const backendUrl = "http://localhost:5000";
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${backendUrl}/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTask(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p className="text-muted mb-1">Task Details</p>
          <h3 className="fw-bold">{task.workRequestId}</h3>
          <span className="badge bg-danger me-2">{task.status}</span>
          <span className="badge bg-info text-dark">{task.stage}</span>
        </div>

        <div>
          <button className="btn btn-outline-secondary me-2 shadow-sm">
            Reassign Task
          </button>
          <button className="btn btn-outline-danger shadow-sm">
            Override Stage
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="card shadow-sm mb-4 border-0 rounded-4">
        <div className="card-body">
          <div className="row g-3">
            <Info label="Batch No" value={task.batchNo} />
            <Info label="Task Type" value={task.type} />
            <Info label="Assigned To" value={task.assignedTo?.name || "Unassigned"} />
            <Info label="Email" value={task.assignedTo?.email || "-"} />
            <Info label="Status" value={task.status} />
            <Info label="Stage" value={task.stage} />
            <Info label="Created On" value={new Date(task.createdAt).toLocaleDateString()} />
            <Info label="Updated On" value={new Date(task.updatedAt).toLocaleDateString()} />
          </div>
        </div>
      </div>

      {/* Workflow Timeline */}
      <div className="card shadow-sm mb-4 border-0 rounded-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-4">Workflow Progress</h5>

          {task.history?.map((step, index) => (
            <div key={index} className="d-flex mb-4 align-items-start">
              <div className="me-3 d-flex flex-column align-items-center">
                <div
                  className="rounded-circle bg-primary shadow"
                  style={{ width: 14, height: 14 }}
                ></div>
                {index !== task.history.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 40,
                      background: "#e0e0e0",
                      marginTop: 4,
                    }}
                  ></div>
                )}
              </div>

              <div>
                <h6 className="mb-1">{step.action}</h6>
                <p className="mb-0 text-muted small">
                  {new Date(step.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted mb-1">Admin Controls</p>
            <h6 className="mb-0">Manage task state & ownership</h6>
          </div>

          <div>
            <button className="btn btn-outline-warning me-2 shadow-sm">
              Send Back
            </button>
            <button className="btn btn-success me-2 shadow-sm">
              Mark Completed
            </button>
            <button className="btn btn-secondary shadow-sm">
              Put On Hold
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="col-md-4">
      <p className="text-muted small mb-1">{label}</p>
      <p className="fw-medium mb-0">{value}</p>
    </div>
  );
}
