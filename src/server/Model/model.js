const mongoose = require('mongoose');

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
  title: { type: String, required: true },
  link:{type: String, required: true },
  image:{type: String, required: true },
  description:{type: String, required: true },
  // category: { type: String, required: true },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = { User, Product, Article };