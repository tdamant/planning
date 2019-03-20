const Trips = require("../lib/trips.js");
const Users = require("../lib/users.js");
const connection = require("../../database/connection");

describe("trips", () => {

    beforeAll( async() => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users RESTART IDENTITY");
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

    it("saves to trips_users", async () => {
        const result = await connection.pool.query("select * from trips_users");
        expect(result.rows[0].user_id).toEqual(1);
        expect(result.rows[0].trip_id).toEqual(1);
    });

    it("can get users on a specific trip", async () => {
        await Trips.saveToDB("second trip", "great trip", '1');
        let result = await Trips.getTripUsers(2);
        expect(result[0].user_id).toEqual(1);
        expect(result[0].trip_id).toEqual(2)
    })
});