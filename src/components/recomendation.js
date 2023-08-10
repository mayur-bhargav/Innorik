import React, { useState, useEffect } from "react";
import axios from "axios";
import noArticlesImage from "./image/no-articles.jpg";

const Recommendations = ({ userId }) => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/${userId}/recommendations`)
      .then((response) => {
        setRecommendedArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [userId]);

  const handleInteract = (articleId, interactionType) => {
    axios
      .post(`/api/user/${userId}/interactions`, {
        articleId,
        interactionType,
      })
      .then(() => {
        console.log("Interaction recorded");
      })
      .catch((error) => {
        console.error("Error recording interaction:", error);
      });
  };

  return (
    <div className="saved-articles-container">
      <h1> No Recommended Articles</h1>
      {recommendedArticles.length === 0 ? (
        <div className="no-articles">
          <img
            src={noArticlesImage}
            alt="No articles available"
            style={{ width: "100%" }}
          />
          <a className="hero-btn1" style={{ padding: "20px" }} href="/">
            Continue Reading
          </a>
        </div>
      ) : (
        <div className="saved-articles-container">
          <h1>Recommended Articles</h1>
          {recommendedArticles.map((article) => (
            <div key={article._id} className="article">
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <button onClick={() => handleInteract(article._id, "like")}>
                Like
              </button>
              <button onClick={() => handleInteract(article._id, "dislike")}>
                Dislike
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
