require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./Routes/router');
const source = process.env.DB_URL;
// Connect to MongoDB
mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());
app.set('view engine', 'ejs');
// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
