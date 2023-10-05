// Import required modules
const express = require('express');
const router = express.Router();
const db = require('../models'); // Import your Sequelize models

// Define a route for the homepage (GET request)
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const blogPosts = await db.BlogPost.findAll({
      include: db.User, // Include the User model to get post creators
      order: [['createdAt', 'DESC']], // Order posts by creation date (newest first)
    });

    // Render the homepage view with the list of blog posts
    res.render('homepage', { blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to view a single blog post
router.get('/blog/:id', async (req, res) => {
  try {
    // Fetch the requested blog post and its comments from the database
    const postId = req.params.id;
    const blogPost = await db.BlogPost.findByPk(postId, {
      include: [db.User, db.Comment], // Include User and Comment models
    });

    if (!blogPost) {
      // Handle the case when the post is not found
      return res.status(404).send('Post not found');
    }

    // Render the blog post view with the post and its comments
    res.render('blog-post', { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router; // Export the router with defined routes
