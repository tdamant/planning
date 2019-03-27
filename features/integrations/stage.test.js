const addTrip = require("./helpers/addTrip.js");
const addUser = require("./helpers/addUser.js");
const stageController = require("../../controllers/stages.js");
const connection = require("../../database/connection.js");

describe("adding a trip", () => {
    beforeAll(async () => {
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await addUser('email@eamil', 'firstName', 'lastName', '000', 'password');
        await addTrip("new Trip", "great trip")
    });
    it("stage is added to db", async () => {
        await stageController.saveStageToDB(
            { body: {
                    stageName: 'book flights',
                    content: 'now',
                    due_date: '09-09-2019',
                    trip_id: 1,

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
        let result = await connection.pool.query("select * from stages");
        await expect(result.rows.length).toEqual(1);
        await expect(result.rows[0].name).toEqual("book flights")
    });
    it("users is added to stages users", async () => {
        let result = await connection.pool.query('select * from stages_users');
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].user_id).toEqual(1);

    })
});



