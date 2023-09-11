import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditTaskModal.css";


function EditTaskModal({ taskId, onClose, onEditSuccess }) {
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
    e.preventDefault();if (
      !formValue.taskName ||
      !formValue.taskDescription ||
      !formValue.dueDate ||
      !formValue.status ||
      !formValue.priority
    ) {
      alert('All fields are required'); 
      return; 
    }

    const res = await axios.put("http://localhost/todo-task/api/index.php", formValue);

    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        onClose();
        onEditSuccess(); 
      }, 2000);
    }
  };

  return (
    <>

    <div
        className="modal-backdrop"
        
        onClick={onClose} 
      ></div>
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" >
          <div className="modal-header">
          <b className="modal-title" >Edit Task</b>            
          <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true" style={{color: 'magenta'}}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label className="col-sm-2 heading"  >
                    Task Name
                    </label>
                  <div className="col-sm-10">
                    <input 
                     type="text" name="taskName" value={formValue.taskName} className="form-control input-box" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2"style={{color: 'white',padding: '5px'}}>
                    Task Description
                    </label>
                  <div className="col-sm-10">
                    <input 
                     type="text" name="taskDescription" value={formValue.taskDescription} className="form-control input-box" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2 l heading"  >
                    Due Date
                    </label>
                  <div className="col-sm-10">
                    <input
                    type="date" name="dueDate" value={formValue.dueDate} className="form-control input-box" onChange={handleInput} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2 heading"  >Status</label>
                  <div className="col-sm-10">
                    <label className={`status-radio ${formValue.status === 'In Progress' ? 'active' : ''}`} style={{color: 'white'}}  >
                      <input type="radio" name="status" value="In Progress" checked={formValue.status === 'In Progress'} onChange={handleInput} />
                      In Progress
                    </label>
                    <label className={`status-radio ${formValue.status === 'Completed' ? 'active' : ''}`} style={{color: 'white',marginLeft: '10px'}}>
                      <input type="radio" name="status" value="Completed" checked={formValue.status === 'Completed'} onChange={handleInput} />
                      Completed
                    </label>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-2 heading"  >
                    Priority
                    </label>
                  <div className="col-sm-10">
                    <select
                    
                     name="priority" className="form-control input-box" value={formValue.priority} onChange={handleInput}>
                      <option value="">--Select Priority--</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-2 heading"  ></label>
                  <div className="col-sm-10">
                    <button type="submit" name="update" className="btn submit-btn" >Update</button>
                  </div>
                </div>
              </form>
              <p className="text-white text-center">{message}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditTaskModal;
