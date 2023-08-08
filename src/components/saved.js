import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    // Fetch the saved articles from the backend
    async function fetchSavedArticles() {
      try {
        const response = await axios.get('/api/articles');
        setSavedArticles(response.data); // Assuming the API returns an array of saved articles
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    }

    fetchSavedArticles();
  }, []);

  return (
    <div>
      <h2>Saved Articles</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {savedArticles.map((article) => (
          <div key={article.link} className="card" style={{ width: '18rem', marginBottom: '20px' }}>
            <img src={article.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text" style={{textAlign:"left"}}>{article.description && article.description.slice(0, 150)}.....</p>
            </div>
            <div className="card-body">
              <a href={article.link} className="hero-btn1">Read more</a>
              
            </div>
          </div>
        ))}
      </div>``
    </div>
  );
};

export default SavedArticles;
