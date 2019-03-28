const Poll = require("../lib/polls.js");
const Trip = require("../lib/trips.js");
const Stage = require("../lib/stage.js");
const User = require("../lib/users.js");
const connection = require("../../database/connection");

describe("polls", () => {
    beforeAll( async () => {
        await connection.pool.query("TRUNCATE TABLE polls, users, stages, trips, stages_users, trips_users, votes, comments RESTART IDENTITY");
        await User.addUser("t", "d", "t@t", 123, "password");
        await Trip.saveToDB("new trip", "great", 1);
        await Stage.addStage("Dates Poll", "Please fill in dates poll", '2018-03-03', 1);

    });


    it("can be saved with options", async() => {
        await Poll.savePollToDB("Date", '1,2,3', '2018-03-03', 1, 1);
        let result = await connection.pool.query("select * from polls");
        expect(result.rows.length).toEqual(1)
    });

    it("polls can be retrieved by tripId", async () => {
        let result = await Poll.getPolls(1);
        expect(result.length).toEqual(1);
        expect(result[0].type).toEqual("Date");
    });

    describe("Votes", () => {
        it("votes can be saved", async () => {
            await Poll.saveVotes(1, 1, 1, '01-poll1,03-poll1', 1);
            let result = await connection.pool.query("SELECT * FROM votes");
            await expect(result.rows.length).toEqual(2)
        })
    })
});