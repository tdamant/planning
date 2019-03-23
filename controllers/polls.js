const pollsModel = require("../models/lib/polls.js");

exports.savePollToDB = async (req, res) => {
  pollsModel.savePollToDB(req.body.type, req.body.options, req.body.deadline, req.body.tripId);
};
