// Get form elements
const form = document.getElementById('add-student-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate form fields
  if (!nameInput.value || !ageInput.value) {
    alert('Please fill in all fields.');
    return;
  }

  if (isNaN(ageInput.value)) {
    alert('Please enter a valid age.');
    return;
  }

  // Make AJAX request to add student to database
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/students');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 201) {
      // Clear form fields
      nameInput.value = '';
      ageInput.value = '';

      // Display success message
      alert('Student added successfully.');
    } else {
      alert('Error adding student.');
    }
  };
  xhr.send(JSON.stringify({ name: nameInput.value, age: ageInput.value }));
});