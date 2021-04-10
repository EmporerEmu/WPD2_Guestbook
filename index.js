// Imports
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const auth = require("./auth/auth");

// Create the application with express
const app = express();

// Deprecated
// TODO: find and use the express middleware
app.use(bodyParser.urlencoded({ extended: true }));

const public = path.join(__dirname, "public");
const views = path.join(__dirname, "views");

app.use(express.static(public));
app.use(express.static(views));

// Create and registering the template engine for the application
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

// Map router to all requests starting from the root
const router = require("./routes/routes");
const { authorise } = require("./auth/auth");
const passport = require("passport");
app.use("/", router);

// Authentication
auth.init(app);
app.use(passport.initialize());

// Sessions
app.use(
	session({
		secret: "dont tell anyone",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.session());

// Server start
app.listen(8080, () => {
	console.log("Server started on port 8080");
});
