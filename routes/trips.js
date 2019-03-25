var express = require('express');
var router = express.Router();
const path = require("path");
const tripsController = require("../controllers/trips.js");


router.post("/create", tripsController.saveTripToDB);
router.get("/:id", tripsController.getById);
router.get("/name/:name", tripsController.getByName);

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "views", "tripHome.html"));
});

module.exports = router;
