// Inporting the nedb module
const { rejects } = require("assert");
const nedb = require("nedb");
const { resolve } = require("path");

class Guestbook {
	constructor(dbFilePath) {
		// Instantiate the db
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true });
			console.log("DB connected to: ", +dbFilePath);
		} else {
			this.db = new nedb();
		}
	}

	// Seeding the database
	init() {
		this.db.insert({
			subject: "I liked the exhibition",
			contents: "nice",
			published: "2020-01-16",
			author: "Peter",
		});
		// for debugging
		console.log("DB entry Peter inserted");
		this.db.insert({
			subject: "Didn't really like it",
			contents: "A really terrible style!",
			published: "2020-02-18",
			author: "Ann",
		});
		// for debugging
		console.log("DB entry Ann inserted");
	}
} // End of class Guestbook

// Exporting the module
module.exports = Guestbook;