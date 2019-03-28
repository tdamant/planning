const tripController = require("../../controllers/trips.js");
const addUser = require("./helpers/addUser.js");
const connection = require("../../database/connection.js");

describe("adding a trip", () => {
    beforeAll(async () => {
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await addUser('email@eamil', 'firstName', 'lastName', '000', 'password')
    });
    it("trip is added to db", async () => {
        await tripController.saveTripToDB(
            {
                cookies: {user: 1},
                body: {
                    tripName: 'Great new trip',
                    description: 'lovely',

                },
                connection: {encrypted: false}
            },
            {
                getHeader: () => {
                }, setHeader: {
                    call: () => {
                    }
                },
                send: () => {
                }
            });
        let result = await connection.pool.query("select * from trips");
        await expect(result.rows.length).toEqual(1);
        await expect(result.rows[0].name).toEqual("Great new trip")
    });
    it("user is added to trips_users", async () => {
        let result = await connection.pool.query('select * from trips_users');
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].user_id).toEqual(1);

    })
});

