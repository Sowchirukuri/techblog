// Example signup.js

// Function to register a new user
function registerUser(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    fetch('/api/signup', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., redirect to the login page or display a success message)
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  }
  
  // Usage: Call registerUser(username, password) to register a new user.
  