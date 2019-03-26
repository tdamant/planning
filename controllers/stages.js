const stagesModel = require("../models/lib/stage.js");
const stagesUsers = require("../models/lib/stagesUsers.js");

exports.saveStageToDB = async (req, res) => {
  let stageId = await stagesModel.addStage(req.body.stageName, req.body.content, req.body.due_date, req.body.trip_id);
    await stagesUsers.addStageToUsers( stageId , req.body.trip_id);
    return stageId
};
exports.getStagesByTripId = async (req, res) => {
  var stages = await stagesModel.getStagesByTripId(req.params.tripId)
  res.send(stages);
};
