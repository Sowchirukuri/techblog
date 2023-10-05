// Import required modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Session secret for encryption
    resave: false,
    saveUninitialized: true,
  })
);

// Configure Express to use Handlebars.js as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up static file serving for CSS, JavaScript, and images
app.use(express.static(path.join(__dirname, 'public')));

// Define routes (import from separate route files)
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

// Use the defined routes
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
