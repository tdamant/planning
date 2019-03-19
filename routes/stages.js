var express = require('express');
var router = express.Router();
const stagesController = require("../controllers/stages.js");


router.post("/create", stagesController.saveStageToDB);


module.exports = router;
