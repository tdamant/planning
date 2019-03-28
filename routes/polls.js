var express = require('express');
var router = express.Router();
const pollsController = require("../controllers/polls.js");

router.post("/create", pollsController.savePollToDB);
router.get('/getPolls', pollsController.getPolls);
router.post('/saveVotes', pollsController.saveVotes);
router.post('/saveResponse', pollsController.saveAsDone);
router.get("/votes", pollsController.getVotes);

module.exports = router;
