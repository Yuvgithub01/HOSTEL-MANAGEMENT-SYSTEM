// Get form elements
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate email and password
  if (!validateEmail(emailInput.value)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (passwordInput.value.length < 8) {
    alert('Please enter a password with at least 8 characters.');
    return;
  }

  // Handle authentication logic
  const email = emailInput.value;
  const password = passwordInput.value;

  // Replace the following line with your own authentication logic
  const isAuthenticated = authenticateUser(email, password);

  if (isAuthenticated) {
    // Redirect to home page or dashboard
    window.location.href = 'home.html';
  } else {
    alert('Invalid email or password.');
  }
});

// Validate email function
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Authenticate user function (replace with your own logic)
function authenticateUser(email, password) {
  // Your authentication logic here
  // For example, you could use an AJAX request to send the email and password to your server
  // and check if the user exists in your database

  // For the purpose of this example, we'll just return true if the email and password match
  // This is not secure and should be replaced with your own authentication logic
  return email === 'test@example.com' && password === 'password';
}