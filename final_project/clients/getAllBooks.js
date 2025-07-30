const axios = require('axios');

async function getAllBooks(callback) {
  try {
    const response = await axios.get('http://localhost:5000/');
    callback(null, response.data);
  } catch (error) {
    callback(error);
  }
}

// Use the function
getAllBooks((error, books) => {
  if (error) {
    console.error('Error fetching books:', error.message);
  } else {
    console.log('Books list:', books);
  }
});
