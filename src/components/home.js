import React, { useState } from "react";
import "../App.css";
import Interests from "./Intrest";
import NewsFeed from "./newsfeed";
import axios from "axios";
import Logo from "./image/logo.png";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [interests, setInterests] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );
  const handleInterestChange = (selectedInterests) => {
    setInterests(selectedInterests);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles([...savedArticles, article]);
  };
  const handleLogout = async () => {
    try {
      await axios.post("https://localhost:5000/logout");
      localStorage.removeItem("jwtToken");
      console.log("Logout successful");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <section className="header">
        <nav>
          <a href="/">
            {" "}
            <img src={Logo} alt="Logo" />{" "}
          </a>
          <div className="nav-links" id="navLinks">
            <i className="fa fa-times" />
            <ul>
              <li>
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="/recommendations">Recommendations</a>
              </li>
              <li>
                <a href="/saved">Save Articles</a>
              </li>
              {localStorage.getItem("jwtToken") ? (
                <>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="logout"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <li>
                      <a className="logout">Login</a>
                    </li>
                  </Link>
                  <Link to="/register">
                    <li>
                      <a className="logout">Register</a>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
          <i className="fa fa-bars" />
        </nav>
        <div className="text-box">
          <h1>Innorik Express News App</h1>
          <p>
            Innorik Express is a local news app that provides current events,
            <br />
            free live news, and local weather alerts for your community.{" "}
          </p>
          <a href className="hero-btn">
            {" "}
            Get Started
          </a>
        </div>
      </section>
      <Interests
        selectedInterests={interests}
        onInterestChange={handleInterestChange}
      />
      <NewsFeed interests={interests} onSaveArticle={handleSaveArticle} />
    </div>
  );
}
export default Home;
