// App.js
import React from "react";
import Home from "./components/home";
// import Signup from "./components/SignupForm";
import Saved from "./components/saved";
import Login from "./components/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recommendations from "./components/recomendation";

function App() {
  console.clear();
  return (
   
    <div>
     
      <BrowserRouter>
               {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          {/* <Route path="/register" element={<Signup />} /> */}
          <Route path="/user" element={<Login />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
