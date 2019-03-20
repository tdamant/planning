const tripsModel = require("../models/lib/trips.js");

exports.saveTripToDB = async (req, res) => {
    console.log(req.cookies);
    await tripsModel.saveToDB(req.body.tripName, req.body.description, req.cookies.user)
  // res.send(id)
};

exports.getByName = async(req, res) => {
  let trip = await tripsModel.getByName(req.params.name);
  res.send(trip);
};