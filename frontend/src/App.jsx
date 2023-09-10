
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="task-list-container ">
      <div className="App">
        <h2 className="mt-4 text-center">Task List</h2>
        <Link to="/addtask" className="btn addBtn-bg" style={{color:'white', backgroundColor:'#7a74bf', padding : '5px 12px',borderRadius: '13px', marginTop:'20px', marginLeft:'-16px'}}>
          Add Task
        </Link>
        <Routes>
           <Route path="/" element={<TaskList />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

