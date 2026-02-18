import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Badge, Modal, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";



export default function Inventory() {

  // ---------------- STATE ----------------
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [filterStage, setFilterStage] = useState("all");
  const [filterAssign, setFilterAssign] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");


  const [newTask, setNewTask] = useState({
    workRequestId: "",
    batchNo: "",
    type: "New Services",
  });

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/admin/gettasks`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setTasks(res.data.tasks);
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH USERS FOR ASSIGN ----------------
  const openAssignModal = async (task) => {
    setSelectedTask(task);
    setShowAssign(true);

    try {
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching users");
    }
  };

  // ---------------- CREATE TASK ----------------
  const handleCreateTask = async () => {
    if (!newTask.workRequestId || !newTask.batchNo || !newTask.type) {
      toast.warning("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/creattask`,
        newTask,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Task Created Successfully ✅");
        setShowCreate(false);
        setNewTask({ workRequestId: "", batchNo: "", type: "New Services" });
        fetchTasks();
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating task");
    }
  };

  // ---------------- ASSIGN TASK ----------------
  const handleAssignTask = async () => {
    if (!selectedUser) {
      toast.warning("Please select a user");
      return;
    }

    try {
      const res = await axios.put(
        `${backendUrl}/api/admin/assign-task`,
        {
          taskId: selectedTask._id,
          userId: selectedUser,
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Task Assigned Successfully ✅");
        setShowAssign(false);
        setSelectedUser("");
        fetchTasks();
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error assigning task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    // TYPE
    if (filterType !== "all" && task.type !== filterType) return false;

    // STAGE
    if (filterStage !== "all" && task.stage !== filterStage) return false;

    // ASSIGNMENT
    if (filterAssign === "assigned" && !task.assignedTo) return false;
    if (filterAssign === "unassigned" && task.assignedTo) return false;

    // 🔍 SEARCH (Task ID OR Batch No)
    if (
      searchTerm &&
      !task.workRequestId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !task.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilterType("all");
    setFilterStage("all");
    setFilterAssign("all");
    setSearchTerm("");
  };




  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
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

      {/* STATS */}
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
              <h6>In Production/QC</h6>
              <h3>{tasks.filter((t) => t.stage !== "Completed").length}</h3>
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

      {/* FILTERS */}
      {/* FILTERS */}
      <div className="card shadow-sm border-0 mb-3">
        <div className="card-body d-flex gap-3 flex-wrap align-items-center">

          {/* TYPE */}
          <Form.Select
            style={{ maxWidth: "180px" }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option>Proposed Mains</option>
            <option>New Business Mains</option>
            <option>Replacement Services</option>
            <option>New Services</option>
          </Form.Select>

          {/* STAGE */}
          <Form.Select
            style={{ maxWidth: "180px" }}
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option>Production</option>
            <option>QC</option>
            <option>Completed</option>
          </Form.Select>

          {/* ASSIGNMENT */}
          <Form.Select
            style={{ maxWidth: "180px" }}
            value={filterAssign}
            onChange={(e) => setFilterAssign(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </Form.Select>

          {/* 🔍 SEARCH */}
          <Form.Control
            type="text"
            placeholder="Search Task ID / Batch No"
            style={{ maxWidth: "220px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🔄 RESET BUTTON */}
          <Button variant="outline-secondary" onClick={resetFilters}>
            Reset
          </Button>

        </div>
      </div>



      {/* TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
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
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id}>
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
                        {task.stage}
                      </Badge>
                    </td>

                    <td>{task.assignedTo?.name || "Unassigned"}</td>

                    <td className="d-flex gap-2">
                      <Link
                        to={`${task._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>

                      {!task.assignedTo && (
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => openAssignModal(task)}
                        >
                          Assign
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Work Request ID</Form.Label>
              <Form.Control
                name="workRequestId"
                value={newTask.workRequestId}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch No</Form.Label>
              <Form.Control
                name="batchNo"
                value={newTask.batchNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Task Type</Form.Label>
              <Form.Select
                name="type"
                value={newTask.type}
                onChange={handleChange}
              >
                <option>Proposed Mains</option>
                <option>New Business Mains</option>
                <option>Replacement Services</option>
                <option>New Services</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ASSIGN TASK MODAL */}
      <Modal show={showAssign} onHide={() => setShowAssign(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Assign task <strong>{selectedTask?.workRequestId}</strong>
          </p>

          <Form.Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.roles.join(", ")})
              </option>
            ))}
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssign(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssignTask}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
