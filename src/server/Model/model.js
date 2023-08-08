const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtSecretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
console.log('JWT Secret Key:', jwtSecretKey);

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model('Product', productSchema);


const articleSchema = new mongoose.Schema({
  title: { type: String,unique: true,},
  link:{type: String, required: true },
  image:{type: String, required: true },
  description:{type: String, required: true },
  // category: { type: String, required: true },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = { User, Product, Article,authMiddleware  };