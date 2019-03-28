const addTrip = require("./helpers/addTrip.js");
const addUser = require("./helpers/addUser.js");
const addStage = require("./helpers/addStage.js");
const pollController = require("../../controllers/polls.js");
const connection = require("../../database/connection.js");
let responseSent;
let res = {getHeader: ()=> {},setHeader: {call: () => {}},
    send: (response)=> {responseSent = response}};

beforeAll(async () => {
    await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
    await addUser("t@t", "Tom", "D", 111, "password");
    await addTrip("new trip", "great trip", 1)
});

describe("saving a poll", () => {
    it("saves poll in db", async () => {
        await pollController.savePollToDB({body:{
            type: "Dates",
                deadline: "09-09-2019",
                tripId: 1,
                options: "1st,2nd,3rd"
            }}, res);
        let result = await connection.pool.query("select * from polls");
        expect(result.rows[0].type).toEqual("Dates");
        expect(result.rows[0].options).toEqual("1st,2nd,3rd")
    });

    it("also saves a stage in the db", async () => {
        let result = await connection.pool.query("select * from stages");
        expect(result.rows[0].name).toEqual("Dates");
        expect(result.rows[0].content).toEqual("Please fill in the dates poll.");
    })
});

describe("getPolls", () => {
    it("returns polls by trip Id", async () => {
        await pollController.savePollToDB({body:{
                type: "Budget",
                deadline: "09-09-2019",
                tripId: 1,
                options: "little,lots,loads"
            }}, res);
        await pollController.getPolls({query:{tripId: 1}}, res);
        expect(responseSent[0].type).toEqual("Dates");
        expect(responseSent[1].type).toEqual("Budget")
    })
});

describe("votes", () => {
    describe("save votes", () => {
        it("saves poll votes in db", async () => {
            await pollController.saveVotes({body: {tripId: 1, pollId: 1, userId: 1, stageId: 1, optionIds: "1-poll1,2-poll1"}}, res);
            let result = await connection.pool.query("select * from votes");
            expect(result.rows.length).toEqual(2);
        });
    });
    describe("saveAsDone", () => {
        it("saves to-dos as done", async () => {
            await addStage("do something", "now", "09-09-2019", 1);
            await pollController.saveAsDone({body:{tripId: 1, userId: 1, stageId: 3}}, res);
            let result = await connection.pool.query("select * from votes where stage_id = 3");
            expect(result.rows[0].trip_id).toEqual(1);
            expect(result.rows[0].user_id).toEqual(1)
        })
    });
    describe("getVotes", () => {
        it("returns all votes by tripId", async () => {
            await pollController.getVotes({query: {tripId: 1}}, res);
            expect(responseSent.length).toEqual(3)

        })
    })
});