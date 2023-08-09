import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import TodosList from "./Components/todos-list.component";

function App() {
  return (
    <Router>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<TodosList />} />
          {/* <Route path="/edit/:id" element={<EditTodo />} />
          <Route path="/create" element={<CreateTodo />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
