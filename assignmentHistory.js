// Get pagination, filtering, and search elements
const paginationContainer = document.getElementById('pagination-container');
const filterInput = document.getElementById('filter-input');
const searchInput = document.getElementById('search-input');

// Set initial page number
let pageNumber = 1;

// Add event listeners for pagination, filtering, and searching
paginationContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    pageNumber = parseInt(event.target.textContent);
    fetchRoomAssignments();
  }
});

filterInput.addEventListener('change', () => {
  pageNumber = 1;
  fetchRoomAssignments();
});

searchInput.addEventListener('input', () => {
  pageNumber = 1;
  fetchRoomAssignments();
});

// Function to fetch room assignments from the server
function fetchRoomAssignments() {
  // Make AJAX request to fetch room assignments from the server
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/room-assignments?page=${pageNumber}&filter=${filterInput.value}&search=${searchInput.value}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Parse JSON data
      const data = JSON.parse(xhr.responseText);

      // Update UI with fetched data
      const roomAssignmentsContainer = document.getElementById('room-assignments-container');
      roomAssignmentsContainer.innerHTML = '';
      data.roomAssignments.forEach((roomAssignment) => {
        const div = document.createElement('div');
        div.textContent = `Student: ${roomAssignment.student.name} (${roomAssignment.student.enrollmentNumber}), Room: ${roomAssignment.room.number} (${roomAssignment.room.type}), Allocation Date: ${roomAssignment.allocationDate}`;
        roomAssignmentsContainer.appendChild(div);
      });

      // Update pagination links
      const paginationLinks = document.getElementById('pagination-links');
      paginationLinks.innerHTML = '';
      data.pages.forEach((page) => {
        const link = document.createElement('a');
        link.textContent = page;
        link.href = '#';
        if (page === pageNumber) {
          link.style.fontWeight = 'bold';
        }
        link.addEventListener('click', (event) => {
          event.preventDefault();
          pageNumber = page;
          fetchRoomAssignments();
        });
        paginationLinks.appendChild(link);
      });
    } else {
      alert('Error fetching room assignments.');
    }
  };
  xhr.send();
}

// Initial fetch of room assignments
fetchRoomAssignments();

document.getElementById('roomAssignmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var roomNumber = document.getElementById('roomNumber').value;
    // Call backend API to fetch assignment history based on room number
    fetch('backend-script.php?roomNumber=' + roomNumber)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayAssignmentHistory(data.assignmentHistory);
            } else {
                document.getElementById('assignmentHistory').innerHTML = '<p>No assignment history found for this room.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
});

function displayAssignmentHistory(assignmentHistory) {
    var historyHTML = '<h2>Assignment History for Room ' + assignmentHistory.roomNumber + '</h2>';
    if (assignmentHistory.history.length === 0) {
        historyHTML += '<p>No assignment history found for this room.</p>';
    } else {
        historyHTML += '<ul>';
        assignmentHistory.history.forEach(entry => {
            historyHTML += '<li><strong>Student:</strong> ' + entry.studentName + ' | <strong>Enrollment Number:</strong> ' + entry.enrollmentNumber + '</li>';
        });
        historyHTML += '</ul>';
    }
    document.getElementById('assignmentHistory').innerHTML = historyHTML;
}