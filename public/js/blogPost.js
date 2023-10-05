// Example blogpost.js

// Function to fetch and display a single blog post by ID
function displayBlogPost(postId) {
    fetch(`/api/blogposts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // Display the blog post data on the page
        const postTitleElement = document.querySelector('#post-title');
        const postContentElement = document.querySelector('#post-content');
  
        postTitleElement.textContent = data.title;
        postContentElement.textContent = data.content;
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });
  }
  
  // Usage: Call displayBlogPost(postId) to fetch and display a blog post by its ID.
  