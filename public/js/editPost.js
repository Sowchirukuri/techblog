// Example editPost.js

// Function to update an existing blog post
function editBlogPost(postId, newTitle, newContent) {
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('content', newContent);
  
    fetch(`/api/blogposts/${postId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., redirect to the updated post or display a success message)
      })
      .catch((error) => {
        console.error('Error updating blog post:', error);
      });
  }
  
  // Usage: Call editBlogPost(postId, newTitle, newContent) to update an existing blog post.
  