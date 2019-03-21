const dotenv = require('dotenv');
dotenv.config();
const Stage = require("../../models/lib/stage.js");
const Users = require("../../models/lib/users.js");
const StagesUsers = require("../../models/lib/stagesUsers.js");
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

    getUsersOnStage: async(stage) => {
        let userIds = await StagesUsers.findUsersOnStage(stage.id);
        let userIdArray = [];
        userIds.forEach(user => {userIdArray.push(user.user_id)});
        let users = await Users.getUsers(userIdArray);
        let result = [];
        users.forEach(user => {
            result.push({stageContent: stage.content, userNumber: user.phone_number});
        });
        return result;
    },

    textCoordinator: async(fakeClient=null) =>  {
        let stages =  await ReminderFinder.getStagesDueTomorrow();
        var textsToSend = [];
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        };
        await asyncForEach(stages, async(stage) => {
            let textArray = await ReminderFinder.getUsersOnStage(stage);
            textsToSend = [ ... textArray];
        });
        await asyncForEach ( textsToSend,async (text) => {
            await textSender.sendText(text.userNumber, text.stageContent, fakeClient)
        });
    }
};

module.exports = ReminderFinder;
