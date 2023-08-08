// App.js
import React, { useState } from 'react';
import Home from './components/home';
import Signup from "./components/SignupForm";
import Saved from "./components/saved";
import Login from "./components/LoginForm"
import { BrowserRouter,Route,Routes ,Navigate} from 'react-router-dom';
function App() {
  const [interests, setInterests] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const isAuthenticated = !!localStorage.getItem("jwtToken"); 
  const handleInterestChange = (selectedInterests) => {
    setInterests(selectedInterests);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles([...savedArticles, article]);
  };
  
  return (
    <div>

    <BrowserRouter>
           {" "}
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/saved" element={<Saved />} />
    <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
    </Routes>
      </BrowserRouter>

      </div>
  );
}

export default App;
