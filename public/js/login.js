// Example login.js

// Function to log in a user
function loginUser(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    fetch('/api/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., redirect to the dashboard or display an error message)
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }
  
  // Usage: Call loginUser(username, password) to log in a user.
  