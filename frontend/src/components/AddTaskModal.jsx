import React, { useState } from "react";
import axios from "axios";

function AddTaskModal({ onClose, onAddSuccess }) {
  const [formValue, setFormValue] = useState({
    taskName: "",
    taskDescription: "",
    dueDate: "",
    status: "",
    priority: "",
  });

  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formValue.taskName ||
      !formValue.taskDescription ||
      !formValue.dueDate ||
      !formValue.status ||
      !formValue.priority
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/todo-task/api/index.php",
        formValue
      );

      if (res.data.success) {
        setMessage(res.data.success);
        setTimeout(() => {
          setMessage("");
          onClose();
          onAddSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ backgroundColor: "#0b0736" }}>
          <div className="modal-header">
            <b
              className="modal-title"
              style={{
                color: "white",
                padding: "2px 12px",
                fontWeight: "bold",
                fontSize: "x-large",
              }}
            >
              Add Task
            </b>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true" style={{ color: "magenta" }}>
                &times;
              </span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-2" style={{ color: "white" }}>
                  Task Name
                </label>
                <div className="col-sm-10">
                  <input
                  style={{width: '370px',
                  marginLeft: '5px',
                  borderRadius: '10px'}}
                    type="text"
                    name="taskName"
                    value={formValue.taskName}
                    className="form-control"
                    onChange={handleInput}
                    placeholder="Enter Task Name"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  className="col-sm-2"
                  style={{ color: "white" }}
                >
                 Task Description
                </label>
                <div className="col-sm-10">
                  <input
                  style={{width: '370px',
                    marginLeft: '5px',
                    borderRadius: '10px'}}
                    type="text"
                    name="taskDescription"
                    value={formValue.taskDescription}
                    className="form-control"
                    onChange={handleInput}
                    placeholder="Enter Description"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2" style={{ color: "white" }}>
                  Due Date
                </label>
                <div className="col-sm-10">
                  <input
                  style={{width: '370px',
                  marginLeft: '5px',
                  borderRadius: '10px'}}
                    type="date"
                    name="dueDate"
                    value={formValue.dueDate}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2" style={{ color: "white" }}>
                  Status
                </label>
                <div className="col-sm-10">
                  <label
                    style={{ color: "white" }}
                    className={`status-radio ${
                      formValue.status === "In Progress" ? "active" : ""
                    }`}
                  >
                    <input
                    
                      type="radio"
                      name="status"
                      value="In Progress"
                      checked={formValue.status === "In Progress"}
                      onChange={handleInput}
                    />
                    In Progress
                  </label>
                  <label
                    style={{ color: "white", marginLeft: "10px" }}
                    className={`status-radio ${
                      formValue.status === "Completed" ? "active" : ""
                    }`}
                  >
                    <input
                    
                      type="radio"
                      name="status"
                      value="Completed"
                      checked={formValue.status === "Completed"}
                      onChange={handleInput}
                    />
                    Completed
                  </label>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2" style={{ color: "white" }}>
                  Priority
                </label>
                <div className="col-sm-10">
                  <select style={{width: '370px',
                    marginLeft: '5px',
                    borderRadius: '10px'}}
                    name="priority"
                    className="form-control"
                    value={formValue.priority}
                    onChange={handleInput}
                  >
                    <option value="">--Select Priority--</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2" style={{ color: "white" }}></label>
                <div className="col-sm-10">
                  <button
                    name="submit"
                    className="btn"
                    style={{
                      color: "white",
                      backgroundColor: "#7a74bf",
                      padding: "6px 34px",
                      borderRadius: "15px",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            <p className="text-white text-center">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
