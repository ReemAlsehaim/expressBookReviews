const axios = require('axios');

function getBooksByAuthor(author) {
  axios.get(`http://localhost:5000/author/${author}`)
    .then(response => {
      console.log(`Books by author "${author}":`);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching books:', error.message);
    });
}

// Replace 'John' with any author name to test
getBooksByAuthor('John');
