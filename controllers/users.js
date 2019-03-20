const usersModel = require("../models/lib/users.js");
const Cookies = require('cookies');

exports.addUser = (req, res) => {
    usersModel.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.password);
    res.send("You signed up!")
};

exports.checkUser = async (req, res) => {
    var cookies = new Cookies(req, res,{httpOnly: false});
    let response = await usersModel.checkUser(req.body.email, req.body.password);
    if (response) {
        cookies.set('user', `${response.id}`);
        res.redirect(req.body.fromUrl)
    } else {
        res.send("Could not find user");
    };
};