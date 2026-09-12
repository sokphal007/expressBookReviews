const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register User (Task 7)
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get book list (Task 2)
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN (Task 3)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message: "Book not found"});
});
  
// Get book details based on Author (Task 4)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let matchingBooks = {};
  for (let id in books) {
    if (books[id].author === author) {
      matchingBooks[id] = books[id];
    }
  }
  return res.status(200).json(matchingBooks);
});

// Get all books based on Title (Task 5)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let matchingBooks = {};
  for (let id in books) {
    if (books[id].title === title) {
      matchingBooks[id] = books[id];
    }
  }
  return res.status(200).json(matchingBooks);
});

// Get book review (Task 6)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;
