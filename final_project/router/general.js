const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//register
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username.length > 0 && password.length > 0) {
      if (isValid(username)) {
        users.push({ username: username, password: password });
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"}); 
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
  return res.send(JSON.stringify({books},null,4));
  })
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
  const ISBN = req.params.isbn.toString();
  let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
  return res.send(filtered_book);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
  const Author = req.params.author;
  let filtered_author = Object.values(books).filter((book) => book.author == Author);
  return res.send(filtered_author);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
  const Title = req.params.title;
  let filtered_title = Object.values(books).filter((book) => book.title == Title);
  return res.send(filtered_title);
  })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const ISBN = req.params.isbn.toString();
  let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
  let filered_reviews = filtered_book.reviews
  return res.send({filered_reviews});
});


module.exports.general = public_users;
