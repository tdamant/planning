const usersModel = require("../models/lib/users.js");

exports.signUpPage = (req, res) => {
    res.sendFile("/Users/tom/Projects/Makers/planning/views/signUp.html");
};

exports.addUser = (req, res) => {
    usersModel.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.password);
    res.send("You signed up!")
};

exports.logInPage = (req, res) => {
    console.log(req.get("Referrer"));
    res.sendFile("/Users/tom/Projects/Makers/planning/views/logIn.html")
};

exports.checkUser = async (req, res) => {
    let response = await usersModel.checkUser(req.body.email, req.body.password);
    response ? res.send("Successfully logged in") : res.send("Could not find user");
};