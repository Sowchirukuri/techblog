// Import Sequelize and the database connection from config.js
const Sequelize = require('sequelize');
const db = require('../config/database');

// Define the BlogPost model
const BlogPost = db.define('BlogPost', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// Define associations (relationships) with other models
BlogPost.belongsTo(db.User); // Each blog post belongs to a user
BlogPost.hasMany(db.Comment); // Each blog post can have multiple comments

// Export the BlogPost model
module.exports = BlogPost;
