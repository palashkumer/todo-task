import React, { useState, useEffect } from "react";
import axios from "axios";

function EditTaskModal({ taskId, onClose }) {
  const [formValue, setFormValue] = useState({
    taskName: "",
    taskDescription: "",
    dueDate: "",
    status: "",
    priority: "",
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://localhost/todo-task/api/index.php?id=${taskId}`);
        const taskData = await response.json();
        setFormValue(taskData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put("http://localhost/todo-task/api/index.php", formValue);

    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label className="col-sm-2">Task Name</label>
                  <div className="col-sm-10">
                    <input type="text" name="taskName" value={formValue.taskName} className="form-control" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2">Description</label>
                  <div className="col-sm-10">
                    <input type="text" name="taskDescription" value={formValue.taskDescription} className="form-control" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2">Due Date</label>
                  <div className="col-sm-10">
                    <input type="date" name="dueDate" value={formValue.dueDate} className="form-control" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2">Status</label>
                  <div className="col-sm-10">
                    <label className={`status-radio ${formValue.status === 'In Progress' ? 'active' : ''}`}>
                      <input type="radio" name="status" value="In Progress" checked={formValue.status === 'In Progress'} onChange={handleInput} />
                      In Progress
                    </label>
                    <label className={`status-radio ${formValue.status === 'Completed' ? 'active' : ''}`}>
                      <input type="radio" name="status" value="Completed" checked={formValue.status === 'Completed'} onChange={handleInput} />
                      Completed
                    </label>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-2">Priority</label>
                  <div className="col-sm-10">
                    <select name="priority" className="form-control" value={formValue.priority} onChange={handleInput}>
                      <option value="">--Select Priority--</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2"></label>
                  <div className="col-sm-10">
                    <button type="submit" name="update" className="btn btn-success">Update</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;