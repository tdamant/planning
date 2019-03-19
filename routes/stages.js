var express = require('express');
var router = express.Router();
const stagesController = require("../controllers/stages.js");


router.post("/create", stagesController.saveStageToDB);
router.get("/:tripId", stagesController.getStagesByTripId);


module.exports = router;
