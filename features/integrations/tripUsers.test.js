const addTrip = require("./helpers/addTrip.js");
const Trips = require("../../models/lib/trips.js");
const addUser = require("./helpers/addUser.js");
const tripsUsersController = require("../../controllers/tripsUsers.js");
const connection = require("../../database/connection.js");
let responseSent;
let res = {getHeader: ()=> {},setHeader: {call: () => {}},
    send: (response)=> {responseSent = response}};

describe("Tripusers", () => {
    beforeAll(async () => {
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await addUser('email@eamil', 'firstName', 'lastName', '000', 'password');
        await Trips.saveToDB("new Trip2", "great trip2", 1);
    });

    it("should save a tripuser is added to db", async () => {
        await tripsUsersController.createTripUser(
            {
                cookies: {user: 1},
                body: {
                    tripId: 1,

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
        let result = await connection.pool.query("select * from trips_users");
        await expect(result.rows.length).toEqual(1);
        await expect(result.rows[0].trip_id).toEqual(1);
    });
    it("returns all users on a given trip", async () => {
        await tripsUsersController.getTripUsers({
            params:{ tripId: 1 },
            connection: {encrypted: false}
        }, res );
        expect(responseSent[0].first_name).toEqual("firstName");
    });

    it("shouldn't return other users not on trip", async () => {
        await addUser("another@email", "other user", 'lastName', '000', 'password');
        await Trips.saveToDB("differenttrip", "great trip", 1);
        await tripsUsersController.createTripUser(
            {
                cookies: {user: 2},
                body: {
                    tripId: 2,

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
        await tripsUsersController.getTripUsers({
            params:{ tripId: 2 },
            connection: {encrypted: false}
        }, res );
        expect(responseSent.length).toEqual(1);
        expect(responseSent[0].first_name).toEqual("other user");
    });

    it("should delete a user from trip", async () => {
        await tripsUsersController.deleteUserFromTrip(
            {
                cookies: {user: 2},
                body: {
                    tripId: 2,
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
        let result = await connection.pool.query("select * from trips_users");
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].user_id).toEqual(1);
    })
});
