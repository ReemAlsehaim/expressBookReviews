const axios = require('axios');

function getBookByISBN(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      console.log(`Book details for ISBN ${isbn}:`);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching book:', error.message);
    });
}

// Replace '1' with any valid ISBN to test
getBookByISBN('1');
