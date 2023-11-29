const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtSecretKey = crypto.randomBytes(32).toString('hex');

async function getRecommendedArticles(userId) {
  const userInteractions = await Interaction.find({ userId });
  const articleIds = userInteractions.map((interaction) => interaction.articleId);
  
  const recommendedArticles = await Article.find({ _id: { $nin: articleIds } })
    .sort('-score')
    .limit(10);

  return recommendedArticles;
}
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
  content: String,
  category: String,
  tags: [String],
});
const Article = mongoose.model('Article', articleSchema);

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  interactionType: String,
  timestamp: { type: Date, default: Date.now },
});
const Interaction= mongoose.model('Interaction', interactionSchema);

module.exports = { User, Product, Article, Interaction, authMiddleware,getRecommendedArticles  };