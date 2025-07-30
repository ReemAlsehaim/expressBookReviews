const express = require('express');
const regd_users = express.Router();

// Store users in memory
let users = [];

// Check if username already exists
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Check if username/password combination is valid
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Register a new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully." });
});

// Login an existing user and save username in session
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (authenticatedUser(username, password)) {
    req.session.username = username; // Save username in session
    return res.status(200).json({ message: `User ${username} logged in successfully.` });
  } else {
    return res.status(401).json({ message: "Invalid username or password." });
  }
});

// Add or Modify a Book Review (requires login)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { review } = req.body;
  const { isbn } = req.params;
  const username = req.session.username; // get username from session

  if (!username) {
    return res.status(401).json({ message: "User not logged in." });
  }

  if (!review) {
    return res.status(400).json({ message: "Review text is required." });
  }

  let books = require("../booksdb.js");

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: `Review for book ${isbn} added/updated successfully.`,
    reviews: books[isbn].reviews
  });
});

// Delete a Book Review (requires login)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.session.username;

  if (!username) {
    return res.status(401).json({ message: "User not logged in." });
  }

  let books = require("../booksdb.js");

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "No review to delete." });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({ message: `Review for book ${isbn} deleted successfully.` });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
