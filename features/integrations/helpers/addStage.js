const stageController = require("../../../controllers/stages.js");


const addStage = (name, content, due_date, trip_id) => {
    await stageController.saveStageToDB(
        { body: {
                stageName: name,
                content: content,
                due_date: due_date,
                trip_id: trip_id

            }, connection: {encrypted: false}
        }, {
            getHeader: () => {
            }, setHeader: {
                call: () => {
                }
            },
            send: () => {
            }
        });
};

module.exports = addStage;

