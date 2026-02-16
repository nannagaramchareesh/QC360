import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Badge, Modal, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { backendUrl } from "../App";

export default function Inventory() {
  // ----- State -----
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({
    workRequestId: "",
    batchNo: "",
    type: "New Services",
  });

  // ----- Handle input change -----
  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  // ----- Fetch all tasks -----
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/admin/gettasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setTasks(res.data.tasks);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  // ----- Create new task -----
  const handleCreateTask = async () => {
    if (!newTask.workRequestId || !newTask.batchNo || !newTask.type) {
      alert("All fields are required");
      return;
    }
    console.log("Creating task with data:", newTask);

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/creattask`,
        {
          // Map frontend state to backend fields explicitly
          workRequestId: newTask.workRequestId,
          batchNo: newTask.batchNo,
          type: newTask.type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;
      if (data.success) {
        alert("Task Created ✅");
        setShowCreate(false);
        setNewTask({ workRequestId: "", batchNo: "", type: "New Services" });
        fetchTasks(); // refresh table
      } else {
        alert(data.message);
      }
    } catch (error) {
      if (error.response?.data?.code === 11000 || error.message.includes("E11000")) {
        alert("Task ID already exists! Please use a unique Task ID.");
      } else {
        console.error(error);
        alert("Error creating task");
      }
    }
  };

  // ----- Fetch tasks on mount -----
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Inventory</h2>
          <p className="text-muted mb-0">All client tasks & assignments</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            + Add Task
          </Button>
          <Button variant="success">Import Excel</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body">
              <h6>Total Tasks</h6>
              <h3>{tasks.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-warning text-dark">
            <div className="card-body">
              <h6>Unassigned</h6>
              <h3>{tasks.filter((t) => !t.assignedTo).length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-info text-white">
            <div className="card-body">
              <h6>In Progress</h6>
              <h3>{tasks.filter((t) => t.stage === "In Progress").length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-success text-white">
            <div className="card-body">
              <h6>Completed</h6>
              <h3>{tasks.filter((t) => t.stage === "Completed").length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <Form.Select>
                <option>All Task Types</option>
                <option>Proposed Mains</option>
                <option>New Business Mains</option>
                <option>Replacement Services</option>
                <option>New Services</option>
              </Form.Select>
            </div>
            <div className="col-md-3">
              <Form.Select>
                <option>All Stages</option>
                <option>Production</option>
                <option>QC</option>
                <option>Completed</option>
              </Form.Select>
            </div>
            <div className="col-md-3">
              <Form.Control placeholder="Search by Task ID / Batch No" />
            </div>
            <div className="col-md-3 text-end">
              <Button variant="outline-secondary">Reset</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Task ID</th>
                  <th>Batch No</th>
                  <th>Type</th>
                  <th>Stage</th>
                  <th>Assigned To</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.workRequestId}>
                    <td className="fw-semibold">{task.workRequestId}</td>
                    <td>{task.batchNo}</td>
                    <td>{task.type}</td>
                    <td>
                      <Badge
                        bg={
                          task.stage === "QC"
                            ? "warning"
                            : task.stage === "Completed"
                            ? "success"
                            : "info"
                        }
                      >
                        {task.stage || "-"}
                      </Badge>
                    </td>
                    <td>{task.assignedTo?.name || "-"}</td>
                    <td>{task.date || "-"}</td>
                    <td>
                      <Link
                        to={`${task.workRequestId}`}
                        type="button"
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        centered
        size="lg"
        className="rounded-3 shadow-lg"
      >
        <Modal.Header
          closeButton
          className="bg-primary text-white border-0 rounded-top"
        >
          <Modal.Title className="fw-bold">Create New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4 bg-light">
          <Form>
            {/* Task ID */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                Task ID
              </Form.Label>
              <Form.Control
                name="workRequestId"
                value={newTask.workRequestId}
                placeholder="Enter Task ID (ex: QC-101)"
                onChange={handleChange}
                className="shadow-sm rounded-2 border-0"
              />
            </Form.Group>

            {/* Batch No (REQUIRED) */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                Batch No <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="batchNo"
                value={newTask.batchNo}
                placeholder="Enter Batch Number"
                onChange={handleChange}
                required
                className="shadow-sm rounded-2 border-0"
              />
            </Form.Group>

            {/* Task Type */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                Task Type
              </Form.Label>
              <Form.Select
                name="type"
                value={newTask.type}
                onChange={handleChange}
                className="shadow-sm rounded-2 border-0"
              >
                <option>Proposed Mains</option>
                <option>New Business Mains</option>
                <option>Replacement Services</option>
                <option>New Services</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex justify-content-between bg-light">
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(false)}
            className="fw-semibold px-4 py-2 rounded-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateTask}
            className="fw-bold px-4 py-2 rounded-2 shadow-sm"
          >
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
