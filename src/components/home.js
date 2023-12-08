import React, { useState, useEffect } from "react";
import "../App.css";
import Interests from "./Intrest";
import NewsFeed from "./newsfeed";
import axios from "axios";
import Logo from "./image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import ImageCarousel from "./Carousel";
function Home() {
  console.clear();
  const [interests, setInterests] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  // const [userName, setUserName] = useState("");
  const images = [
    "https://img.freepik.com/free-vector/safe-food-delivery-order-receive_23-2148549716.jpg?w=996&t=st=1696835468~exp=1696836068~hmac=6f40c5c90aa258e0034868fba6e940110618c72b6d8566cc3b40b7313289982a",
    "https://img.freepik.com/free-photo/traditional-italian-food-world-tourism-day_23-2149114038.jpg?w=996&t=st=1696835523~exp=1696836123~hmac=a9d0aa18166e8657d9ba03250aed4f8fe518fd3f858cc14d540af26d9e785880",
    "https://img.freepik.com/free-vector/food-order-app-banner-with-hands-holding-smartphone-flat-illustration_1284-57486.jpg?w=900&t=st=1696835576~exp=1696836176~hmac=049907753220eb905bcb24a1f45207918c24b901e61f21e5a89b7ea50be2ae4d",
    
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://innoriknews.onrender.com/user", {
          headers: {
            Authorization: token,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleInterestChange = (selectedInterests) => {
    setInterests(selectedInterests);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles([...savedArticles, article]);
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://innoriknews.onrender.com/logout");
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
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <i className="fa fa-times" onClick={() => setMenuOpen(false)} />
            <ul>
            <Link to="/">
              <li >
                <a style={{color:"white"}}>HOME</a>
              </li>
              </Link>
              <Link to="/recommendations">
              <li >
                <a style={{color:"white"}}>Recommendations</a>
              </li>
              </Link>
              <Link to="/saved">
              <li >
                <a style={{color:"white"}}>Saved Articles</a>
              </li>
              </Link>
              {localStorage.getItem("jwtToken") ? (
                <>
                  <li>
                    <a onClick={handleLogout} className="logout" style={{ cursor: "pointer" }}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/user">
                    <li>
                      <a className="logout">Login</a>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
          <i className="fa fa-bars" onClick={() => setMenuOpen(!menuOpen)} />
        </nav>
        <div className="text-box">
          {isAuthenticated && <h1>Welcome, {userName}!</h1>} 
          <h1>Innorik Express News App</h1>
          <p>
            Innorik Express is a local news app that provides current events,
            <br />
            free live news, and local weather alerts for your community.{" "}
          </p>
          {localStorage.getItem("jwtToken") ? (
            <a></a>
          ) : (
            <Link to="/user">
              {" "}
              <a href className="hero-btn">
                {" "}
                Get Started
              </a>{" "}
            </Link>
          )}
        </div>
      </section>
      <Interests selectedInterests={interests} onInterestChange={handleInterestChange} />
      <NewsFeed interests={interests} onSaveArticle={handleSaveArticle} />
    </div>
  );
}

export default Home;