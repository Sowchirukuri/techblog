// Import Sequelize and the database connection from config.js
const Sequelize = require('sequelize');
const db = require('../config/database');

// Define the Comment model
const Comment = db.define('Comment', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// Define associations (relationships) with other models
Comment.belongsTo(db.User); // Each comment belongs to a user
Comment.belongsTo(db.BlogPost); // Each comment belongs to a blog post

// Export the Comment model
module.exports = Comment;
