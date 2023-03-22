const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let matchingUsers = users.filter((user) => {
    return user.username === username;
  });
  if (matchingUsers.length > 0) {
    return false;
  }
  return true;
};

const authenticatedUser = (username, password) => {
  let matchingUsers = users.filter((user) => {
    return user.username === username && user.password === password;
  });

  if (matchingUsers.length > 0) {
    return true;
  }
  return false;
};


regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken,username,
    };

    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn/:review", (req, res) => {

  res.send("The user's review has been added/updated successfully.");
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

  res.send("The review was deleted successfully.");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
