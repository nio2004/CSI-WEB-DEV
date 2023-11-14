const jwt = require('jsonwebtoken');
const { secretKey } = require('./config'); // Replace with your actual secret key

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = {
      userId: decoded.userId,
      // Add more user properties as needed
    };

    next();
  });
};

module.exports = { authenticateMiddleware };
