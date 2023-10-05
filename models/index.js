// Import Sequelize and configure the database connection
const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // Use the MySQL database
});

// Create an object to hold the database connection and models
const db = {};

// Import and initialize models
db.Sequelize = Sequelize; // Expose Sequelize for use in models
db.sequelize = sequelize; // Expose the database connection

db.User = require('./User')(sequelize, Sequelize);
db.BlogPost = require('./BlogPost')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);

// Define model associations (relationships)
db.User.hasMany(db.BlogPost); // Each user can have multiple blog posts
db.BlogPost.belongsTo(db.User); // Each blog post belongs to a user
db.BlogPost.hasMany(db.Comment); // Each blog post can have multiple comments
db.Comment.belongsTo(db.User); // Each comment belongs to a user
db.Comment.belongsTo(db.BlogPost); // Each comment belongs to a blog post

// Export the database connection and models
module.exports = db;
