// Imports
const express = require('express');
const guestBookController = require("../controllers/guestBookController");
const userController = require("../controllers/userController");

const router = express.Router();

// Routes
// Guestbook routes
// index
router.get("/", guestBookController.index);

// User routes
router.get("/user-register", userController.register);

// Exporting the module
module.exports = router;