// Import required modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth'); // Import middleware for authentication
const db = require('../models'); // Import your Sequelize models

// Define a route to edit a comment (GET request)
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;

    // Fetch the comment from the database
    const comment = await db.Comment.findByPk(commentId);

    if (!comment) {
      // Handle the case when the comment is not found
      return res.status(404).send('Comment not found');
    }

    // Check if the authenticated user is the author of the comment
    if (comment.UserId !== req.user.id) {
      // Handle unauthorized access (e.g., redirect to a 403 Forbidden page)
      return res.status(403).send('Unauthorized');
    }

    // Render the comment edit form
    res.render('edit-comment', { comment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to update a comment (PUT request)
router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body; // Extract updated content from the request body

    // Fetch the comment from the database
    const comment = await db.Comment.findByPk(commentId);

    if (!comment) {
      // Handle the case when the comment is not found
      return res.status(404).send('Comment not found');
    }

    // Check if the authenticated user is the author of the comment
    if (comment.UserId !== req.user.id) {
      // Handle unauthorized access (e.g., redirect to a 403 Forbidden page)
      return res.status(403).send('Unauthorized');
    }

    // Update the comment content in the database
    comment.content = content;
    await comment.save();

    // Redirect back to the blog post after updating the comment
    res.redirect(`/blog/${comment.BlogPostId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to delete a comment (DELETE request)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;

    // Fetch the comment from the database
    const comment = await db.Comment.findByPk(commentId);

    if (!comment) {
      // Handle the case when the comment is not found
      return res.status(404).send('Comment not found');
    }

    // Check if the authenticated user is the author of the comment
    if (comment.UserId !== req.user.id) {
      // Handle unauthorized access (e.g., redirect to a 403 Forbidden page)
      return res.status(403).send('Unauthorized');
    }

    // Delete the comment from the database
    await comment.destroy();

    // Redirect back to the blog post after deleting the comment
    res.redirect(`/blog/${comment.BlogPostId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router; // Export the router with defined routes
