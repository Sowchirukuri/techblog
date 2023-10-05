// Example logout.js

// Function to log out the current user
function logoutUser() {
    fetch('/api/logout')
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., redirect to the login page or display a success message)
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
  
  // Usage: Call logoutUser() to log out the current user.
  