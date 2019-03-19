var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js");

router.get("/sign_up", usersController.signUpPage);

router.post("/", usersController.addUser);

router.get("/log_in", usersController.logInPage);

router.post("/authenticate", usersController.checkUser);

module.exports = router;