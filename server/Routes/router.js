const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, Product } = require("../Model/model");
const sendVerificationEmail = require("../Email_verification");
const router = express.Router();
const { authenticateUser, getUserByEmail } = require("./auth");
const cors = require("cors");

// Load environment variables from .env file
require("dotenv").config();


    
    function generateVerificationToken() {
      const token = crypto.randomBytes(32).toString("hex");
      return token;
    }
    
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add the required methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Add the required headers
    };
    
    router.use(cors(corsOptions));
    router.post("/signup", async (req, res) => {
      const { name, email, password, cpassword } = req.body;
      
      if (password !== cpassword) {
        return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
      }
      
      try {
        const verificationToken = generateVerificationToken();
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
          return res.status(409).json({ error: "Email already registered" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedcPassword = await bcrypt.hash(cpassword, 10);
        
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          cpassword: hashedcPassword,
          verificationToken,
        });
        await newUser.save();
        await sendVerificationEmail(email, verificationToken, name);
        res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
});

router.post("/products", async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    res.json({ message: "Data stored" });
  } catch (error) {
    res.status(500).json({ error: "Error storing data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Email not verified" });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error finding user" });
  }
});

router.post("/logout", async (req, res) => {
  res.json({ message: "Logout successful" });
});

router.get("/user", authenticateUser, async (req, res) => {
  try {
    // console.log("Authenticated user:", req.user);

    // Extract user ID from decoded user information
    const userId = req.user.userId;

    // Retrieve user details using the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      res.render("emailnotverified");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.render("emailverified");
  } catch (error) {
    console.error("Error verifying user:", error);

    res.render("emailnotverified");
  }
});

module.exports = router;
