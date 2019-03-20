var express = require('express');
var router = express.Router();
const tripsUsersController = require("../controllers/tripsUsers.js");


router.get("/:tripId", tripsUsersController.getTripUsers);


module.exports = router;
