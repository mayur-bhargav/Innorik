const jwt = require("jsonwebtoken");
const { User } = require("../Model/model");

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  // Check if a token is provided
  if (!token) {
      // console.log('No token provided');
      return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, 'your-secret-key');
      // console.log('Decoded User:', decoded);

      // Attach user information to the request
      req.user = decoded;

      // Continue to the next middleware/route if verification is successful
      next();
  } catch (error) {
      console.error('Token Verification Error:', error);
      return res.status(401).json({ error: 'Unauthorized' });
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
  getUserByEmail
};
