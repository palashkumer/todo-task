import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTaskModal from "./EditTaskModal";
import "./TaskList.css"; 


function TaskList() {
  const [taskData, setTaskData] = useState([]);
  const [message, setMessage] = useState('');
  const [editTaskId, setEditTaskId] = useState(null); 

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = async () => {
    try {
      const response = await fetch("http://localhost/todo-task/api/index.php");
      const data = await response.json();
      if (data.result === 'No Task Data Found') {
        setTaskData([]);
      } else {
        setTaskData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/todo-task/api/index.php?id=${id}`);
      setMessage(response.data.success);
      getTaskData();
    } catch (error) {
      console.error("Error deleting Task:", error);
    }
  }

  const openEditTaskModal = (id) => {
    setEditTaskId(id); 
  }

  const closeEditTaskModal = () => {
    setEditTaskId(null); 
  }

  const handleEditSuccess = () => {
    getTaskData();
  };

  return (
    <React.Fragment>
      <div className="task-list-data-table ">
        <div className="row ">
          <div className="task-list " >
            <p className="text-danger">{message}</p>
            
            <table className="table table-bordered custom-table task-list-data-table">

            <thead>

            <tr className="table-header-data" >
                  <th scope="col">Task</th>
                  <th  scope="col">Task Description</th>
                  <th  scope="col">Priority</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                  <th  scope="col">Action</th>
                </tr>
              </thead>
              
              <tbody className="custom-table-body">

                {taskData.map((task, index) => (
                  <tr key={index} >
                    <td>{task.taskName}</td>
                    <td>{task.taskDescription}</td>
                    <td>
                    <span
                      className={`priority-column ${
                        task.priority === "Low"
                          ? "low-priority"
                          : task.priority === "Medium"
                          ? "medium-priority"
                          : task.priority === "High"
                          ? "high-priority"
                          : "default-priority" 
                      }`}
                    >
                      {task.priority}
                    </span>
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                    <span
                      className={`status-column ${
                        task.status === "In Progress"
                          ? "in-progress"
                          : task.status === "Completed"
                          ? "completed"
                          : "default-status" 
                      }`}
                    >
                      {task.status}
                    </span>
                    </td>
                    <td>
                      <button className="btn btn-success mx-2" onClick={() => openEditTaskModal(task.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {editTaskId && (
        <EditTaskModal taskId={editTaskId} onClose={closeEditTaskModal} onEditSuccess={handleEditSuccess} />
      )}

    </React.Fragment>
  );
}
export default TaskList;