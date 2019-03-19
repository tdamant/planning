const usersModel = require("../models/lib/users.js");

exports.signUpPage = (req, res) => {
    res.sendFile("/Users/tom/Projects/Makers/planning/views/signUp.html");
};

exports.addUser = (req, res) => {
    usersModel.addUser(req.firstName, req.lastName, req.email, req.phoneNumber, req.password);
    res.send("You signed up!")
};