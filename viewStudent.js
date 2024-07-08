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
    fetchStudents();
  }
});

filterInput.addEventListener('change', () => {
  pageNumber = 1;
  fetchStudents();
});

searchInput.addEventListener('input', () => {
  pageNumber = 1;
  fetchStudents();
});

// Function to fetch students from the server
function fetchStudents() {
  // Make AJAX request to fetch students from the server
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/students?page=${pageNumber}&filter=${filterInput.value}&search=${searchInput.value}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Parse JSON data
      const data = JSON.parse(xhr.responseText);

      // Update UI with fetched data
      const studentsContainer = document.getElementById('students-container');
      studentsContainer.innerHTML = '';
      data.students.forEach((student) => {
        const div = document.createElement('div');
        div.textContent = `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`;
        studentsContainer.appendChild(div);
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
          fetchStudents();
        });
        paginationLinks.appendChild(link);
      });
    } else {
      alert('Error fetching students.');
    }
  };
  xhr.send();
}

// Initial fetch of students
fetchStudents();