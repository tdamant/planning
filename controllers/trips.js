const tripsModel = require("../models/lib/trips.js");

exports.saveTripToDB = async (req, res) => {
    console.log("in trip controller")
    let tripId = await tripsModel.saveToDB(req.body.tripName, req.body.description, req.cookies.user);
    await tripsModel.addUserToTrip(tripId.id, req.cookies.user);
    res.send(tripId)
};

exports.getById = async(req, res) => {
  let trip = await tripsModel.getById(req.params.id);
  res.send(trip);
};

exports.getByName = async(req, res) => {
  let trips = await tripsModel.getByName(req.params.name);
  res.send(trips);
};
