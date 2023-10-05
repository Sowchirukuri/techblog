// Import required modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth'); // Import middleware for authentication
const db = require('../models'); // Import your Sequelize models
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Define a route to register a new user (GET request)
router.get('/register', forwardAuthenticated, (req, res) => {
  res.render('register'); // Render the registration form
});

// Define a route to register a new user (POST request)
router.post('/register', forwardAuthenticated, async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if the username is already registered
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).render('register', {
        error: 'Username already exists',
      });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await db.User.create({
      username,
      password: hashedPassword,
    });

    // Redirect to the login page after successful registration
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to log in (GET request)
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login'); // Render the login form
});

// Define a route to log in (POST request)
router.post('/login', forwardAuthenticated, async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if the username exists in the database
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).render('login', {
        error: 'Invalid username or password',
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render('login', {
        error: 'Invalid username or password',
      });
    }

    // Store user information in the session to indicate that the user is logged in
    req.session.user = user;

    // Redirect to the dashboard after successful login
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to log out (GET request)
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.session.destroy(); // Destroy the session to log the user out
  res.redirect('/auth/login');
});

module.exports = router; // Export the router with defined routes
