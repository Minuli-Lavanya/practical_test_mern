import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import TodosList from "./Components/todos-list.component";
import TodosEdit from "./Components/todo-edit-screen";

function App() {
  return (
    <Router>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<TodosList />} />
          <Route path="/edit" element={<TodosEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
