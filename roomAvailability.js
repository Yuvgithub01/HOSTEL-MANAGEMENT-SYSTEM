       // Dummy data for demonstration
       var singleRoomCount = 10; // Update with actual count from backend
       var doubleRoomCount = 5; // Update with actual count from backend
       
       // Update the HTML with the room counts
       document.getElementById('singleRoomCount').textContent = singleRoomCount;
       document.getElementById('doubleRoomCount').textContent = doubleRoomCount;

       // Function to check room availability
       function checkRoomAvailability() {
           var roomNumber = document.getElementById('roomNumber').value;
           // Dummy logic to check room availability (replace with actual logic)
           var available = Math.random() < 0.5; // Randomly generate availability status
           var message = available ? 'Room ' + roomNumber + ' is available.' : 'Room ' + roomNumber + ' is not available.';
           document.getElementById('roomAvailability').textContent = message;
       }
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