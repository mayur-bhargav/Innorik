import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SavedArticles from './saved'; // Import the SavedArticles component
import { Link } from 'react-router-dom';
import "../App.css"
axios.defaults.baseURL = 'http://localhost:5000';

const NewsFeed = ({ interests }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  // const [savedArticles, setSavedArticles] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [article, setArticle] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  useEffect(() => {
    async function fetchNews() {
      const apiKey = '122a28fdd165418d917fc4c240832384'; // Replace with your actual API key
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

      try {  
        const response = await axios.get(url);
        console.log('API Response:', response.data.articles); // Add this line
        setNews(response.data.articles);
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
    try {
      // Get the JWT token from local storage or any other means of authentication
      const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with the key you use to store the token
  
      // Send a POST request to the server to save the article with the JWT token in the headers
      const response = await axios.post('/api/articles', {
        link: article.url,
        title: article.title,
        image:article.urlToImage,
        description:article.description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);
      // If you want to update the SavedArticles component's state, you can do it here
      // For example:
      // setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
    } catch (error) {
      // If there was an error, handle it appropriately
      console.error('Save article error:', error);
    }
  };

  return (
    <div>
       
       
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filteredNews.map((article) => (
          <div key={article.url} className="card" style={{ width: '18rem', marginBottom: '20px' }}>
            <img src={article.urlToImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text" style={{textAlign:"left"}}>{article.description && article.description.slice(0, 150)}.....</p>
            </div>
            <div className="card-body">
              <a href={article.url} className="hero-btn1">Read more</a>
              <a className="hero-btn1" onClick={() => handleSaveArticle(article)}>Save</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
