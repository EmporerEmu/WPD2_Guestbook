// Imports
const express = require('express');
const guestBookController = require("../controllers/guestBookController");

const router = express.Router();

// Routes

// index
router.get("/", guestBookController.index);

// Exporting the module
module.exports = router;