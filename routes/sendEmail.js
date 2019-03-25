var express = require('express');
var router = express.Router();
const emailController = require("../controllers/sendEmail.js");


router.post("/", emailController.sendEmail);


module.exports = router;
