const tripsModel = require("../models/trips.js");

exports.saveTripToDB = async (req, res) => {
  console.log(req.body);
    await tripsModel.saveToDB(req.body.tripName, req.body.description, req.body.attendee1, req.body.tripStart, req.body.tripEnd);
};
