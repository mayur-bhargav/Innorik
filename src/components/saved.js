import React, { useEffect, useState } from "react";
import axios from "axios";
import noArticlesImage from "./image/no-articles.jpg";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    async function fetchSavedArticles() {
      try {
        const response = await axios.get("/api/articles");
        setSavedArticles(response.data);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
      }
    }

    fetchSavedArticles();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`/api/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setSavedArticles(
        savedArticles.filter((saved) => saved._id !== articleId)
      );
    } catch (error) {
      console.error("Delete article error:", error);
    }
  };

  if (savedArticles.length === 0) {
    return (
      <div className="saved-articles-container">
        <h2> No Saved Articles Yet</h2>
        <img src={noArticlesImage} alt="No Saved Articles" />
        <a
          className="hero-btn1"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            padding: "22px",
          }}
          href="/"
        >
          Continue Reading
        </a>
      </div>
    );
  }

  return (
    <div className="saved-articles-container">
      <h2>Saved Articles</h2>

      <div className="grid-container">
        {savedArticles.map((article) => (
          <div
            key={article.link}
            className="card"
            style={{ width: "18rem", marginBottom: "20px" }}
          >
            <img
              src={article.image}
              className="card-img-top"
              alt="Image Not Found"
            />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text" style={{ textAlign: "left" }}>
                {article.description && article.description.slice(0, 150)}.....
              </p>
            </div>
            <div className="card-body">
              <a href={article.link} className="hero-btn1">
                Read more
              </a>
              <button
                className="hero-btn1"
                onClick={() => handleDeleteArticle(article._id)}
              >
                Unsave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedArticles;
