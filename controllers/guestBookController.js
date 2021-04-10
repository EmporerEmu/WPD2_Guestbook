// Importing the Guestbook class
const { response } = require("express");
const guestBookDAO = require("../models/guestBookModel");
// Create an instance of the class
const db = new guestBookDAO();
// Seeding the database
db.init();

// root
exports.index = function (req, res) {
	db.getAllEntries()
		.then((list) => {
			res.render("index", {
				entries: list,
			});
			console.log("Promise resolved");
		})
		.catch((err) => {
			console.log("Promise rejected", err);
		});
};
