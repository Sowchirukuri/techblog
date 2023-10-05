// Import required modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth'); // Import middleware for authentication
const db = require('../models'); // Import your Sequelize models

// Define a route to view a single blog post
router.get('/:id', async (req, res) => {
  try {
    // Fetch the requested blog post and its comments from the database
    const postId = req.params.id;
    const blogPost = await db.BlogPost.findByPk(postId, {
      include: db.Comment,
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

// Define a route to create a new comment on a blog post (POST request)
router.post('/:id/comment', ensureAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body; // Extract content from the request body

    // Create a new comment in the database and associate it with the blog post and authenticated user
    await db.Comment.create({
      content,
      BlogPostId: postId,
      UserId: req.user.id,
    });

    // Redirect back to the blog post after creating the comment
    res.redirect(`/blog/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Other controller functions for editing and deleting blog posts can be defined here

module.exports = router; // Export the router with defined routes
