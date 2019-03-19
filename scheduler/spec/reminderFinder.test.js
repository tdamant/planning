getStagesDueTomorrow = require("../lib/reminderService.js");
const Stage = require("../../models/lib/stage.js");
const connection = require("../../database/connection");



describe("getStagesDueTomorrow", () => {
    it("return list of all stages due tomorrow", async () => {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        var tomorrowDate = `0${tomorrow.getMonth()+1}-${tomorrow.getDate()}-${tomorrow.getFullYear()}`;
        await connection.pool.query("TRUNCATE TABLE stages RESTART IDENTITY");
        await Stage.addStage("First Stage", "please confirm your attendance", tomorrowDate, 1);
        await Stage.addStage("Second Stage", "please confirm your attendance", '05-09-2020', 1);
        let result = await getStagesDueTomorrow(tomorrowDate);
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual("First Stage")
    });
});
