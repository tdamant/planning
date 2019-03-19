var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js");

router.get("/sign_up", usersController.signUpPage);

router.post("/", usersController.addUser);

module.exports = router