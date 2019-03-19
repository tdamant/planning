var express = require('express');
var router = express.Router();
const tripsController = require("../controllers/trips.js");


router.post("/create", tripsController.saveTripToDB);
router.get("/:name", tripsController.getByName);


module.exports = router;
