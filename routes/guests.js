var express = require('express');
var router = express.Router();
const path = require("path");
// const guestsController = require("../controllers/polls.js");

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "views", "guests.html"));
})

module.exports = router;
