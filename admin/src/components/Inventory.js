import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Badge, Dropdown, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Inventory() {
    const [showAssign, setShowAssign] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const tasks = [
        {
            id: "QC-001",
            batchNo: "B-101",
            type: "New Services",
            stage: "QC",
            assignedTo: "Rahul",
            date: "2026-02-08",
        },
        {
            id: "QC-002",
            batchNo: "B-102",
            type: "Proposed Main",
            stage: "Production",
            assignedTo: "Unassigned",
            date: "2026-02-09",
        },
    ];

    const openAssignModal = (task) => {
        setSelectedTask(task);
        setShowAssign(true);
    };

    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Inventory</h2>
                    <p className="text-muted mb-0">All client tasks & assignments</p>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="primary">+ Add Task</Button>
                    <Button variant="success">Import Excel</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-primary text-white">
                        <div className="card-body">
                            <h6>Total Tasks</h6>
                            <h3>128</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-warning text-dark">
                        <div className="card-body">
                            <h6>Unassigned</h6>
                            <h3>18</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-info text-white">
                        <div className="card-body">
                            <h6>In Progress</h6>
                            <h3>76</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-success text-white">
                        <div className="card-body">
                            <h6>Completed</h6>
                            <h3>34</h3>
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
                                <option>New Services</option>
                                <option>Proposed Main</option>
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
                                <tr key={task.id}>
                                    <td className="fw-semibold">{task.id}</td>
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
                                    <td>{task.assignedTo}</td>
                                    <td>{task.date}</td>
                                    <td>
                                            <Link to={`${task.id}`} type="button" class="btn btn-primary">
                                                View
                                            </Link>
                                            
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
