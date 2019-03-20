ReminderFinder = require("../lib/reminderService.js");
const Stage = require("../../models/lib/stage.js");
const connection = require("../../database/connection");
const fakeClientClass = require ("./fakeTextSender.js");
const fakeClient = new fakeClientClass();

describe("getStagesDueTomorrow", () => {
    it("return list of all stages due tomorrow", async () => {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        var tomorrowDate = `0${tomorrow.getMonth()+1}-${tomorrow.getDate()}-${tomorrow.getFullYear()}`;
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
        await Stage.addStage("First Stage", "please confirm your attendance", tomorrowDate, 1);
        await Stage.addStage("Second Stage", "please confirm your attendance", '05-09-2020', 1);
        let result = await ReminderFinder.getStagesDueTomorrow(tomorrowDate);
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual("First Stage")
    });
});

describe("textCoordinator", () => {
    it("sends texts to appropiate events", async () => {
       await ReminderFinder.textCoordinator(fakeClient);
        expect(fakeClient.messages.sent[0].body).toEqual("please confirm your attendance")
    })
});
