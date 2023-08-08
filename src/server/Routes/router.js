const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY; // Make sure you set this environment variable
const { User, Product, Article } = require('../Model/model');
const sendVerificationEmail = require('../Email_verification');
const router = express.Router();

function generateVerificationToken() {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}
router.post('/signup', async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).json({ error: 'Password and Confirm Password do not match' });
  }

  try {
    const verificationToken = generateVerificationToken();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedcPassword = await bcrypt.hash(cpassword, 10);

    const newUser = new User({ name, email, password: hashedPassword, cpassword: hashedcPassword, verificationToken });
    await newUser.save();
    await sendVerificationEmail(email, verificationToken, name);
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

router.post('/products', async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    res.json({ message: 'Data stored' });
  } catch (error) {
    res.status(500).json({ error: 'Error storing data' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error finding user' });
  }
});

router.get('/users', (req, res) => {
  User.find()
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Error retrieving users' });
  });
});

router.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user in the database based on the verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
     
      res.render('emailnotverified');
    }

    // Set the isVerified field to true
    user.isVerified = true;
    user.verificationToken = undefined; // Remove the verification token
    await user.save();
    res.render('emailverified');
  } catch (error) {
    console.error('Error verifying user:', error);
   
    res.render('emailnotverified');
  }
});

router.get('/products', (req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving products' });
    });
});

router.post('/api/articles', async (req, res) => {
  try {
    const { title, description, link,image } = req.body;

    // Create a new article using the provided data
    const article = new Article({ title, description, link,image });

    // Save the article to the database
    await article.save();

    res.status(201).json({ message: 'Article saved successfully.' });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'An error occurred while saving the article.' });
  }
});
router.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find({ userId: req.userId });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching saved articles.' });
  }
});

module.exports = router;
