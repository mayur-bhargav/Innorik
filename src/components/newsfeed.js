import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://innoriknews.onrender.com";

const NewsFeed = ({ interests }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  useEffect(() => {
    async function fetchNews() {
      const apiKey = '6627a809a3e42452afe607b2ec6ebcc6'; // Replace with your actual API key
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=in&max=10&apikey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setNews(response.data.articles.map(article => ({ ...article, isSaved: false }))); // Initialize isSaved property
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    fetchNews();
  }, []);

  useEffect(() => {
    if (interests.length > 0) {
      const filteredNews = news.filter((article) =>
        interests.some((interest) => article.title.toLowerCase().includes(interest))
      );
      setFilteredNews(filteredNews);
    } else {
      setFilteredNews(news);
    }
  }, [interests, news]);

  const handleSaveArticle = async (article) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // User is not authenticated, redirect to login page
      navigate.push('/login'); // Change '/login' to your actual login route
      return;
    }
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('/api/articles', {
        link: article.url,
        title: article.title,
        image: article.imagemage,
        description: article.description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Article Saved Successful");
      console.log(response.data.message);
      setSavedArticles([...savedArticles, response.data.savedArticle]);
    } catch (error) {
      console.error('Save article error:', error);
      toast.error("Article Already Saved")
    }
  };
  
  const handleToggleSave = async (article) => {
    try {
      await axios.delete(`/api/articles/${article._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
  
      setSavedArticles(savedArticles.filter(saved => saved._id !== article._id));
    } catch (error) {
      console.error('Unsave article error:', error);
    }
  };
  return (
    <div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className="grid-container">
      {filteredNews.map((article) => (
        // Check if both image and description are not null before rendering
        article.image && article.description && (
          <div key={article.url} className="card">
            <img src={article.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text" style={{ textAlign: "left" }}>{article.description.slice(0, 150)}.....</p>
            </div>
            <div className="card-body">
              <a href={article.url} className="hero-btn1">Read more</a>
              {localStorage.getItem('jwtToken') ? (
              article.isSaved ? (
                <button
                  className="hero-btn1"
                  onClick={() => handleToggleSave(article)}
                >
                  Unsave
                </button>
              ) : (
                <button
                  className="hero-btn1"
                  onClick={() => handleSaveArticle(article)}
                >
                  Save
                </button>
              )
            ) : (
              <Link to="/user" className="hero-btn1" >
                Log in
              </Link>
            )}

            </div>
          </div>
        )
      ))}
    </div>
    </div>
  );
};
export default NewsFeed;