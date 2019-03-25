var express = require('express');
var router = express.Router();
const path = require("path");
const pollsController = require("../controllers/polls.js");

router.post("/create", pollsController.savePollToDB);
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "views", "polls.html"));
})
router.get('/getPolls', pollsController.getPolls)
// router.post('/saveVotes', pollsController.saveVotes)

module.exports = router;
