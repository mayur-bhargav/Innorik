const jwt = require("jsonwebtoken");
const { User } = require("../Model/model");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded.userId,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user; // Here, you may want to modify this line based on your user schema
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = { authenticateUser };
