const Stage = require("../lib/stage.js");
const connection = require("../../database/connection");


describe("stage", () => {

    beforeEach( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users RESTART IDENTITY");
    });

    it("can add stages", async () => {
        await Stage.addStage("New stage", "please confirm your attendance", '03-19-2018', 1);
        const result = await connection.pool.query("select * from stages");
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].id).toEqual(1);
        expect(result.rows[0].name).toEqual("New stage");
        expect(result.rows[0].content).toEqual('please confirm your attendance');
    });

    it("can get info about a stage from the database", async () => {
        await Stage.addStage("New stage", "please confirm your attendance", '03-19-2018', 1);
        await Stage.addStage("Another new stage", "please confirm your attendance", '03-29-2018', 1);
        const result = await Stage.getStages('03-29-2018');
        expect(result[0].name).toEqual("Another new stage");
    })
});