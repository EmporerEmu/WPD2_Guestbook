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

	// A function to get all entries from the database
	getAllEntries() {
		// Returns a promise object, can be resolved or rejected
		return new Promise((resolve, reject) => {
			// Use the find() function of the nedb to get the data
			// error first callback function, err for error, entries for data
			this.db.find({}, function (err, entries) {
				// If error occurs, reject promise
				if (err) {
					reject(err);
				} else {
					// To see what the returned data looks like
					resolve(entries);
					console.log("function all() returns: ", entries);
				}
			});
		});
	}

	getPetersEntries() {
		return new Promise((resolve, reject) => {
			this.db.find({ author: "Peter" }, function (err, entries) {
				if (err) {
					reject(err);
				} else {
					resolve(entries);
					console.log("getPetersEntries() returns:", entries);
				}
			});
		});
	}

	addEntry(author, subject, contents) {
		var entry = {
			author: author,
			subject: subject,
			contents: contents,
			published: new Date().toLocaleDateString("en-gb"),
		};
		console.log("Entry created", entry);

		this.db.insert(entry, function (err, doc) {
			if (err) {
				console.log("Error inserting entry", subject);
			} else {
				console.log("Document inserted into db", doc);
			}
		});
	}

	genEntriesByUser(authorName) {
		return new Promise((resolve, reject) => {
			this.db.find({ author: authorName }, function (err, entries) {
				if (err) {
					reject(err);
				} else {
					resolve(entries);
					console.log("getEntriesByUser returns: ", entries);
				}
			});
		});
	}
} // End of class Guestbook

// Exporting the module
module.exports = Guestbook;
