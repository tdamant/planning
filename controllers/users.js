const usersModel = require("../models/lib/users.js");
const Cookies = require('cookies');

exports.addUser = async (req, res) => {
  var cookies = new Cookies(req, res,{httpOnly: false});
  let existsInDb = await usersModel.authSignUp(req.body.email);
  if (existsInDb) {
    res.send('user already exists')
  } else {
    let user = await usersModel.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.password);
    cookies.set('user', `${user.id}`);
    res.send('succesfully saved to db')
  };
};

exports.authLogin = async (req, res) => {
  var cookies = new Cookies(req, res,{httpOnly: false});
  let response = await usersModel.authLogin(req.body.email, req.body.password);
  if (response) {
      cookies.set('user', `${response.id}`);
      res.send('successfully authenticated')
  } else {
      res.send('failed to authenticate')
  };
}
