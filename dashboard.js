// Get button and container elements
const fetchDataButton = document.getElementById('fetch-data-button');
const dataContainer = document.getElementById('data-container');

// Add event listener for button click
fetchDataButton.addEventListener('click', () => {
  // Make AJAX request to fetch data
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/data');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Parse JSON data
      const data = JSON.parse(xhr.responseText);

      // Update UI with data
      dataContainer.innerHTML = '';
      data.forEach((item) => {
        const div = document.createElement('div');
        div.textContent = `ID: ${item.id}, Name: ${item.name}, Age: ${item.age}`;
        dataContainer.appendChild(div);
      });
    } else {
      alert('Error fetching data.');
    }
  };
  xhr.send();
});