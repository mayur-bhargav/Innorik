const express = require('express');
const app = express();

// Simulated user data with their reading habits
const userData = {
  'user1': ['article1', 'article3', 'article5'],
  'user2': ['article2', 'article3', 'article6'],
  // Add more user data here...
};

// Simulated articles data with their topics
const articlesData = {
  'article1': ['tech', 'programming'],
  'article2': ['science', 'research'],
  'article3': ['tech', 'programming'],
  'article4': ['health', 'fitness'],
  'article5': ['art', 'culture'],
  'article6': ['science', 'technology'],
  // Add more articles data here...
};

// Function to recommend articles based on user's reading habits
function recommendArticles(userId) {
  const userReadingHabits = userData[userId];
  const recommendedArticles = {};

  userReadingHabits.forEach(articleId => {
    const articleTopics = articlesData[articleId];
    
    for (const topic of articleTopics) {
      for (const article in articlesData) {
        if (articlesData[article].includes(topic) && !userReadingHabits.includes(article)) {
          recommendedArticles[article] = recommendedArticles[article] || 0;
          recommendedArticles[article]++;
        }
      }
    }
  });

  const sortedRecommendedArticles = Object.keys(recommendedArticles).sort((a, b) => recommendedArticles[b] - recommendedArticles[a]);

  return sortedRecommendedArticles;
}

// API endpoint to get article recommendations for a user
app.get('/recommend/:userId', (req, res) => {
  const userId = req.params.userId;
  const recommendations = recommendArticles(userId);
  res.json(recommendations);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
