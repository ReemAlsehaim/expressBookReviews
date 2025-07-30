const express = require('express');
let books = require("../booksdb.js");
const public_users = express.Router();

// Register route - still placeholder if needed
public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Task 3: Get all books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.author.toLowerCase().includes(author)
  );

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({message: "No books found for the specified author."});
  }
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.title.toLowerCase().includes(title)
  );

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({message: "No books found for the specified title."});
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn] && books[isbn].reviews) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "No reviews found for this book."});
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  const matchingBooks = [];

  for (let isbn in books) {
    if (books[isbn].title.toLowerCase().includes(title)) {
      matchingBooks.push(books[isbn]);
    }
  }

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found with the given title." });
  }
});
module.exports.general = public_users;
