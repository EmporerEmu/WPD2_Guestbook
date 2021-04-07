// Importing the Guestbook class
const { response } = require("express");
const guestBookDAO = require("../models/guestBookModel");
// Create an instance of the class
const db = new guestBookDAO();
// Seeding the database
db.init();

// root
exports.index = function(req, res) {
    res.send("<h1>Index. Not yet implemented.</h1>")
}