const addTrip = require("./helpers/addTrip.js");
const addUser = require("./helpers/addUser.js");
const commentController = require("../../controllers/comments.js");
const connection = require("../../database/connection.js");
let responseSent;
let res = {getHeader: ()=> {},setHeader: {call: () => {}},
    send: (response)=> {responseSent = response}};

describe("adding a comment", () => {
    beforeAll(async () => {
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await addUser('email@eamil', 'firstName', 'lastName', '000', 'password');
        await addTrip("new Trip", "great trip")
    });
    it("stage is added to db", async () => {
        await commentController.saveComment(
            {
                cookies: {user: 1},
                body: {
                    comment: 'sounds great!',
                    announcement: false,
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
        let result = await connection.pool.query("select * from comments");
        await expect(result.rows.length).toEqual(1);
        await expect(result.rows[0].comment).toEqual("sounds great!");
        await expect(result.rows[0].announcement).toEqual(false)
    });
    it("returns all comments by trip Id", async () => {
        await commentController.getComments({
            params:{ id: 1 },
            connection: {encrypted: false}
            }, res );
        expect(responseSent[0].comment).toEqual("sounds great!")
    });

    it("shouldn't return other trip comments", async () => {
        await addTrip("Trip2", "great trip");
        await commentController.saveComment(
            {
                cookies: {user: 1},
                body: {
                    comment: 'comment on 2nd trip',
                    announcement: false,
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
        await commentController.getComments({
            params:{ id: 2 },
            connection: {encrypted: false}
            }, res );
        expect(responseSent.length).toEqual(1);
        expect(responseSent[0].comment).toEqual("comment on 2nd trip")
    });
});