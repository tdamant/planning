const StagesUsers = require("../lib/stagesUsers.js");
const connection = require("../../database/connection");
const sleep = require("sleep");


describe("StagesUsers", () => {

    beforeAll( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users, votes, comments, polls RESTART IDENTITY");
        await connection.pool.query("INSERT into trips (name, description) VALUES('trip', 'description')");
        await connection.pool.query("INSERT into users (first_name, last_name, email, phone_number, password ) VALUES('Tom', 'd', 'tom@tom', '000', 'tom')");
        await connection.pool.query("INSERT into trips_users (trip_id, user_id) VALUES (1, 1)");
        await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage1', 'stageydecription1', '03-29-2018', '1')");
        await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage2', 'stageydecription2', '03-29-2018', '1')");
        await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage3', 'stageydecription3', '03-29-2018', '1')");
        await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage4', 'stageydecription4', '03-29-2018', '1')");

    });

    it("can add users to stages", async () => {
        await StagesUsers.addUserToStages("1", "1");
        await sleep.sleep(1);
        let stage_user_1 = await connection.pool.query("select * from stages_users where stage_id = 1");
        expect(stage_user_1.rows[0].user_id).toEqual(1);
        let stage_user_2 = await connection.pool.query("select * from stages_users where stage_id = 2");
        expect(stage_user_2.rows[0].user_id).toEqual(1);
        let stage_user_3 = await connection.pool.query("select * from stages_users where stage_id = 3");
        expect(stage_user_3.rows[0].user_id).toEqual(1);
        let stage_user_4 = await connection.pool.query("select * from stages_users where stage_id = 4");
        expect(stage_user_4.rows[0].user_id).toEqual(1);
    });

    it("can find users on a stage", async () => {
        let result = await StagesUsers.findUsersOnStage(3);
        expect(result[0].user_id).toEqual(1)
    });

    it("can delete a user from all stages it's been added to", async () => {
        await StagesUsers.deleteUsersFromStages([{id: 1}, {id: 2}, {id:3}, {id:4}, {id: 5}], 1);
        let result = await connection.pool.query("select * from stages_users");
        expect(result.rows.length).toEqual(0)
    });
});