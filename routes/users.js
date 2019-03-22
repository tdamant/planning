var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js");

router.post("/create", usersController.addUser);

router.post("/authenticate", usersController.authLogin);

router.get("/", usersController.getUser);

module.exports = router;
