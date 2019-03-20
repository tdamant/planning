const usersModel = require("../models/lib/users.js");
const Cookies = require('cookies');

exports.addUser = (req, res) => {
    usersModel.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.password);
    // set the cookie here so they are logged in to session
    res.send("You signed up!") // here we'll send them to the home page
};

exports.checkUser = async (req, res) => {
    var cookies = new Cookies(req, res,{httpOnly: false});
    let response = await usersModel.checkUser(req.body.email, req.body.password);
    if (response) {
        cookies.set('user', `${response.id}`);
        if (req.body.fromUrl) {
          res.redirect(req.body.fromUrl)
        } else {
          res.send("success") // here we'll send them to the home page
        }
    } else {
        res.send("Could not find user"); // here we'll have an alert 
    };
};
