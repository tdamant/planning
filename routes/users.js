var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js");
const tripsUsersController = require("../controllers/tripsUsers.js");

router.post("/create", usersController.addUser);

router.post("/authenticate", usersController.authLogin);

router.get("/trips", usersController.getTripsByUser);
router.delete("/trips", tripsUsersController.deleteUserFromTrip);

router.get("/", usersController.getUser);
router.get("/:id", usersController.getUserById);

module.exports = router;
