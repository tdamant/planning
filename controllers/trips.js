const tripsModel = require("../models/lib/trips.js");

exports.saveTripToDB = async (req, res) => {
    console.log(req.cookies);
    let tripId = await tripsModel.saveToDB(req.body.tripName, req.body.description, req.cookies.user)
    res.send(tripId)
};

exports.getById = async(req, res) => {
  let trip = await tripsModel.getById(req.params.id);
  res.send(trip);
};