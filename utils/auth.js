// utils/auth.js

// Import any necessary modules and dependencies
const jwt = require('jsonwebtoken');

// Define a secret key for JWT (JSON Web Tokens)
const secretKey = 'your-secret-key'; // Replace with a secure secret key

// Middleware function to authenticate user's JWT token
function authenticateJWT(req, res, next) {
  const token = req.header('auth-token'); // Assuming you send the token in a header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Store user data in the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

module.exports = { authenticateJWT };
