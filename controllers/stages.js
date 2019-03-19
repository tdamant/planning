const stagesModel = require("../models/lib/stage.js");

exports.saveStageToDB = async (req, res) => {
  await stagesModel.addStage(req.body.stageName, req.body.content, req.body.due_date, req.body.trip_id)
};
exports.getStagesByTripId = async (req, res) => {
  var stages = await stagesModel.getStagesByTripId(req.params.tripId)
  res.send(stages);
}
