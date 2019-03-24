const pollsModel = require("../models/lib/polls.js");
const stageController = require("./stages.js");

exports.savePollToDB = async (req, res) => {
  pollsModel.savePollToDB(req.body.type, `${req.body.options}`, req.body.deadline, req.body.tripId);
  stageController.saveStageToDB({body:
    { stageName: req.body.type,
      content: '', // in model, create the content for the reminder
      due_date: req.body.deadline,
      trip_id: req.body.tripId
    }
  })
};
