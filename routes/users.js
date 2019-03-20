var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js");

router.post("/", usersController.addUser);

router.post("/authenticate", usersController.checkUser);

module.exports = router;