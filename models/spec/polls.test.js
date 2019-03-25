// const Poll = require("../lib/polls.js");
// const Trip = require("../lib/trips.js");
// const User = require("../lib/users.js");
// const connection = require("../../database/connection");
//
// describe("polls", () => {
//     beforeAll( async () => {
//         await connection.pool.query("TRUNCATE TABLE polls, users, stages, trips, stages_users, trips_users, votes RESTART IDENTITY");
//         await User.addUser("t", "d", "t@t", 123, "password");
//         await Trip.saveToDB("new trip", "great", 1);
//         await Poll.savePollToDB("Date", '1,2,3', '2018-03-03', 1);
//     });
//     describe("Votes", () => {
//         it("votes can be saved", async () => {
//             await Poll.saveVotes(1, 1, '1,2,3,4,5,6,7,8,9,10');
//             let result = await connection.pool.query("SELECT * FROM votes");
//             console.log(result);
//             await expect(result.rows.length).toEqual(10)
//         })
//     })
// });