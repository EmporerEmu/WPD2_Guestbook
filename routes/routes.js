// Imports
const express = require('express');
const guestBookController = require("../controllers/guestBookController");
const userController = require("../controllers/userController");
const auth = require("../auth/auth");

const router = express.Router();

// Routes
// Guestbook routes
// index
router.get("/", guestBookController.index);

// User routes
router.get("/user-register", userController.register);

router.post("/user-register", userController.postRegister);

router.get("/user-login", userController.login);

router.post("/user-login", auth.authorise("/user-login"), userController.postLogin);

// Exporting the module
module.exports = router;