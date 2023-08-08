const express = require('express');
const app = express();
const Parser = require('rss-parser');
const parser = new Parser();

// Replace this with your actual function to fetch news data from your website
async function fetchNewsData() {
  // Your logic to fetch news data here...
  // Example: const newsData = await fetchNewsFromWebsite();
  return newsData;
}

app.get('/rss', async (req, res) => {
  const newsData = await fetchNewsData();
  const feed = {
    title: 'Your Website News',
    link: 'https://feed.livehindustan.com/rss/3127',
    description: 'Latest news from Your Website',
    items: newsData,
  };
  
  res.set('Content-Type', 'application/rss+xml');
  res.send(parser.parseString(feed));
});

const port = 3001; // Replace this with your desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
