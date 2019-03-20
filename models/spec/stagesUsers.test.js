const StagesUsers = require("../lib/stagesUsers.js");
const connection = require("../../database/connection");
const sleep = require("sleep")


describe("StagesUsers", () => {

    beforeEach( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
    });

    // it("can add users to stages", async () => {
    //     await connection.pool.query("INSERT into trips (name, description) VALUES('trip', 'description')")
    //     await connection.pool.query("INSERT into users (first_name, last_name, email, phone_number, password ) VALUES('Tom', 'd', 'tom@tom', '000', 'tom')")
    //     await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage1', 'stageydecription', '03-29-2018', '1')")
    //     await connection.pool.query("INSERT into stages (name, content, due_date, event_id) VALUES('stage2', 'stageydecription2', '03-29-2018', '1')")
    //     let response = await StagesUsers.addUserToStages("1", "1");
    //     console.log(response)
    //     await sleep.sleep(3)
    //
    //     const result = await connection.pool.query("select * from stages_users");
    //     console.log(result);
    //     expect(result.rows.length).toEqual(2);
    //     expect(result.rows[0].user_id).toEqual(1);
    //     expect(result.rows[0].stage_id).toEqual(1);
    //     expect(result.rows[1].user_id).toEqual(1);
    //     expect(result.rows[1].stage_id).toEqual(2);
    // });
});