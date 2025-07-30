const axios = require('axios');

function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

// Call the function with the title you want to search
getBooksByTitle("Things Fall Apart")
  .then(books => console.log("Books matching title:", books))
  .catch(err => console.error("Error fetching books:", err.message));
