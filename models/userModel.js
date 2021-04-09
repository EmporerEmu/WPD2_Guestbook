const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserDao {
	constructor(dbFilePath) {
		if (dbFilePath) {
			// embedded
			this.db = new Datastore({ filename: dbFilePath, autoload: true });
		} else {
			// in memory
			this.db = new Datastore();
		}
	}

	// for the seeded users, that password is the bcrypt of the username
	init() {
		this.db.insert({
			user: "Peter",
			password:
				"$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C",
		});
		this.db.insert({
			user: "Ann",
			password:
				"$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S",
		});
		return this;
	}

	create(username, password) {
		const that = this;
		bcrypt.hash(password, saltRounds).then(function (hash) {
			var entry = {
				user: username,
				password: hash,
			};
			console.log("User entry is: ", entry);

			that.db.insert(entry, function (err) {
				if (err) {
					console.log("Failed to insert user", username);
				}
			});
		});
	}

	lookup(user, cb) {
		this.db.find({ user: user }, function (err, entries) {
			if (err) {
				return cb(null, null);
			} else {
				if (entries.length == 0) {
					return cb(null, null);
				}
				return cb(null, entries[0]);
			}
		});
	}
}

const dao = new UserDao();
dao.init();
module.exports = dao;