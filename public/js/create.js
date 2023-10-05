// Example create.js

// Function to submit a new blog post
function createBlogPost(title, content) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
  
    fetch('/api/blogposts', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., redirect to the new post or display a success message)
      })
      .catch((error) => {
        console.error('Error creating blog post:', error);
      });
  }
  
  // Usage: Call createBlogPost(title, content) to submit a new blog post.
  