// App.js
import React, { useState } from 'react';
import "../App.css"
import Interests from './Intrest';
import NewsFeed from './newsfeed';
import SavedArticles from './saved';
import { Link } from 'react-router-dom';
function Home() {
  const [interests, setInterests] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
 
  const handleInterestChange = (selectedInterests) => {
    setInterests(selectedInterests);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles([...savedArticles, article]);
  };

  return (
    <div>
      <section className="header">
       {/* Navbar starts */}
       <nav>
          <a href="index.html"> <img src={""} alt="Logo" /> </a>
          <div className="nav-links" id="navLinks">
            <i className="fa fa-times"  />
            <ul>
              <li><a href="/">HOME</a></li>
              <li><a href="/saved">Save Articles</a></li>
              <Link to ="/login"><li><a>LOGIN</a></li></Link>
              <Link to ="/register"><li><a>Register</a></li></Link>
            </ul>
          </div>
          <i className="fa fa-bars"  />
        </nav>
        <div className="text-box">
        <h1>Innorik Express News App</h1>
        <p>Innorik Express is a local news app that provides current events,<br />free live news, and local weather alerts for your community. </p>
        <a href className="hero-btn"> Get Started</a>
      </div>
      </section>
      
    
      <Interests selectedInterests={interests} onInterestChange={handleInterestChange} />
      <NewsFeed interests={interests} onSaveArticle={handleSaveArticle} />
      </div>
  );
}

export default Home;
