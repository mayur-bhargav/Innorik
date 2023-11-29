require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const router = require("./Routes/router");  // Adjust the path accordingly

const source = process.env.DB_URL;



mongoose
  .connect(source, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  const corsOptions = {
    origin: 'https://innoriknews.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));



app.use(express.json());
app.set("view engine", "ejs");
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});


app.use(router);  // Include the router

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
