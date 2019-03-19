const dotenv = require('dotenv');
dotenv.config();
const Stage = require("../../models/lib/stage.js");
const textSender = require('./textSender.js');

let ReminderFinder = {
    getStagesDueTomorrow: async() => {
        const getTomorrowsDate = () => {
            var today = new Date();
            var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            if (tomorrow.month < 9) {
                var tomorrowMonth = `0${tomorrow.getMonth()+1}`
            }
            else {
                var tomorrowMonth = tomorrow.getMonth()+1
            }
            return `${tomorrowMonth}-${tomorrow.getDate()}-${tomorrow.getFullYear()}`;
        };
        let result = await Stage.getStages(getTomorrowsDate());
        return result
    },
    textCoordinator: async(fakeClient=null) =>  {
         let stages = await ReminderFinder.getStagesDueTomorrow();
         stages.forEach( (stage) => {
            textSender.sendText(process.env.TOM_NUMBER, stage.content, fakeClient)
        });
    }
};

ReminderFinder.textCoordinator();

module.exports = ReminderFinder;


