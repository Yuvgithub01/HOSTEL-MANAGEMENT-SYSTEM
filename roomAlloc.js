// Get form elements
const form = document.getElementById('room-allocation-form');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const enrollmentNumber = document.getElementById('enrollment-number').value;
  const roomNumber = document.getElementById('room-number').value;
  const roomType = document.getElementById('room-type').value;

  // Validate form data
  if (!enrollmentNumber || !roomNumber || !roomType) {
    alert('Please fill in all fields.');
    return;
  }

  // Make AJAX request to allocate room to student
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/room-allocation');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 201) {
      // Clear form fields
      document.getElementById('enrollment-number').value = '';
      document.getElementById('room-number').value = '';
      document.getElementById('room-type').value = 'Single';

      // Display success message
      alert('Room allocation successful.');
    } else {
      alert('Error allocating room.');
    }
  };
  xhr.send(JSON.stringify({ enrollmentNumber, roomNumber, roomType }));
});