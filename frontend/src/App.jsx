
// import  { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import TaskList from './components/TaskList';
// import AddTask from './components/AddTask';

// function App() {
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);

//   const closeAddTaskModal = () => {
//     setShowAddTaskModal(false);
//   };

//   return (
//     <div className="container">
//       <div className="App">
//         <h2 className="mt-4 text-center">Task List</h2>
//         <button className="btn btn-success mx-3 mt-4" onClick={() => setShowAddTaskModal(true)}>
//           Add Task
//         </button>
//         <Routes>
//           <Route path="/tasklist" element={<TaskList />} />
//           <Route path="/addtask" element={<AddTask onClose={closeAddTaskModal} />} />
//         </Routes>
//       </div>

//       <div
//         className={`modal ${showAddTaskModal ? 'show' : ''}`}
//         tabIndex="-1"
//         role="dialog"
//         style={{ display: showAddTaskModal ? 'block' : 'none' }}
//       >
//         <div className="modal-dialog" role="document">
//           <AddTask onClose={closeAddTaskModal} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


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
