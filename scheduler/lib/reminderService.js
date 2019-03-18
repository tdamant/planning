const dotenv = require('dotenv');
dotenv.config();
const Stage = require("../../models/lib/stage.js");
const textSender = require('./textSender.js');

class ReminderFinder {

    static async getStagesDueTomorrow() {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        if (tomorrow.month < 9) {
            var tomorrowMonth = `0${tomorrow.getMonth()+1}`
        }
        else {
            var tomorrowMonth = tomorrow.getMonth()+1
        }

        var tomorrowDate = `${tomorrowMonth}-${tomorrow.getDate()}-${tomorrow.getFullYear()}`;
        let result = await Stage.getStages(tomorrowDate);
        return result
    };


     static async textCoordinator(fakeClient=null) {
         let stages = await ReminderFinder.getStagesDueTomorrow();
         stages.forEach( (stage) => {
            textSender.sendText(process.env.TOM_NUMBER, stage.content, fakeClient)
        });
    };

}

ReminderFinder.textCoordinator();

module.exports = ReminderFinder;

