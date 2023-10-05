// Import Sequelize and the database connection from config.js
const Sequelize = require('sequelize');
const db = require('../config/database');

// Define the User model
const User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define associations (relationships) with other models
User.hasMany(db.BlogPost); // Each user can have multiple blog posts
User.hasMany(db.Comment); // Each user can have multiple comments

// Export the User model
module.exports = User;
