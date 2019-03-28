const Trips = require("../models/lib/trips.js");
const StagesUsers = require("../models/lib/stagesUsers.js");
const Stages = require("../models/lib/stage.js");
const Users = require("../models/lib/users.js");

exports.getTripUsers = async (req, res) => {
    let tripUsers = await Trips.getTripUsers(req.params.tripId);
    let users = await returnUsers(tripUsers);
    res.send(users);
};

const returnUsers = async(tripUsers) => {
    let tripUserIds = [];
    tripUsers.forEach(tripUser => { tripUserIds.push(tripUser.user_id) });
    return await Users.getUsers(tripUserIds);
};

exports.createTripUser = async(req, res) => {
    await Trips.addUserToTrip(req.body.tripId, req.cookies.user);
    await StagesUsers.addUserToStages(req.body.tripId, req.cookies.user);
    res.send("complete");
};


exports.deleteUserFromTrip = async (req, res) => {
  await Trips.removeUserFromTrip(req.body.tripId, req.cookies.user);
  let stages = await Stages.getStagesByTripId(req.body.tripId);
  await StagesUsers.deleteUsersFromStages(stages, req.cookies.user);
  res.send("success")
};
