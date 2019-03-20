const Trips = require("../lib/trips.js");
const Users = require("../lib/users.js");
const connection = require("../../database/connection");

describe("trips", () => {

    beforeAll( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
        await Users.addUser('is', 'cooper', 'is@is.com', '0123556', 'password');
        await Users.addUser('tom', 'd', 'tom@tom.com', '0123556', 'password');
    });

    it("saves trips with relevant details", async () => {
        await Trips.saveToDB("new trip", "great trip", '1');
        const result = await connection.pool.query("select * from trips");
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].id).toEqual(1);
        expect(result.rows[0].name).toEqual("new trip");
        expect(result.rows[0].description).toEqual('great trip');
    });


    it("can get users on a specific trip", async () => {
        await Trips.saveToDB("second trip", "great trip", '1');
        await Trips.addUserToTrip(2, 1);
        let result = await Trips.getTripUsers(2);
        expect(result[0].user_id).toEqual(1);
        expect(result[0].trip_id).toEqual(2)
    });

    it("can't get users when trip id wrong", async () => {
        let result = await Trips.getTripUsers(3);
        expect(result.length).toEqual(0)
    });

    describe("addUserToTrip", () => {
        it("adds user_id and trip_id to users trips id", async() => {
           await Trips.addUserToTrip(1, 2);
           let result = await connection.pool.query("select * from trips_users order by id desc limit 1");
            expect(result.rows[0].trip_id).toEqual(1);
           expect(result.rows[0].user_id).toEqual(2)
        });
    });

});