
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTaskModal from "./EditTaskModal";

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
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <p className="text-danger">{message}</p>
            <table className="table table-bordered">
              <thead>
                <tr className="bg-dark text-white">
                  <th scope="col">Task</th>
                  <th scope="col">Task Description</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {taskData.map((task, index) => (
                  <tr key={index}>
                    <td>{task.taskName}</td>
                    <td>{task.taskDescription}</td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status === "1" ? "In Progress" : "Completed"}</td>
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