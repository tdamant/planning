var express = require('express');
var router = express.Router();
const commentsController = require("../controllers/comments.js");

router.post("/", commentsController.saveComment);
router.get('/trips/:id', commentsController.getComments);

module.exports = router;
