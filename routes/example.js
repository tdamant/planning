var express = require('express');
var router = express.Router();
const exampleController = require("../controllers/example.js");


router.get("/", exampleController.getData);

module.exports = router; 