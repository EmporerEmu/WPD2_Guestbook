// Imports
const userDao = require("../models/userModel");

// user-register
exports.register = function (req, res) {
    res.render("user/register");
}

// post: user-register
exports.postRegister = function (req, res) {
    const user = req.body.username;
    const password = req.body.password;

    if (!user || !password) {
        res.send(401, "no user or no password");
        console.log("no user or no password");
        return;
    }
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            console.log("User exists");
            return;
        }
        userDao.create(user,password);
        res.redirect("/");
    })
}