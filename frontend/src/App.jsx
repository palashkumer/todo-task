
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="container">
      <div className="App">
        <h2 className="mt-4 text-center">Task List</h2>
        <Link to="/addtask" className="btn btn-success mx-3 mt-4">
          Add Task
        </Link>
        <Routes>
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;