// Import individual controller modules
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

// Export all controllers as an object
module.exports = {
  userRoutes,
  blogPostRoutes,
  commentRoutes,
};
