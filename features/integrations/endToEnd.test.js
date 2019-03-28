const addTrip = require("./helpers/addTrip.js");
const addTripUser = require("./helpers/addTripUser.js");
const addPoll = require("./helpers/addPoll.js");
const addStage = require("./helpers/addStage.js");
const addUser = require("./helpers/addUser.js");
const ReminderFinder = require("../../scheduler/lib/reminderService.js");
const connection = require("../../database/connection.js");
const fakeClientClass = require ("../../scheduler/spec/fakeTextSender.js");
const fakeClient = new fakeClientClass();

describe("sending texts to relevant users", () => {
    let responseSent;
    let res = {getHeader: ()=> {},setHeader: {call: () => {}},
        send: (response)=> {responseSent = response}};
    beforeAll(async () => {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        var tomorrowDate = `0${tomorrow.getMonth()+1}-${tomorrow.getDate()}-${tomorrow.getFullYear()}`;
        await connection.pool.query("truncate table users, votes, trips, stages, comments, polls, stages_users, trips_users restart identity");
        await addUser('email@eamil', 'firstName', 'lastName', '000', 'password');
        await addUser('second@eamil', 'second', 'person', '111', 'password');
        await addUser('third@eamil', 'third', 'person', '222', 'password');
        await addTrip("first Trip", "great trip", 1);
        await addTrip("second Trip", "better trip", 2);
        await addPoll("Dates", tomorrowDate, 1, "now,then.whenever");
        await addPoll("Budget", '01-01-2019', 1, 'little,lots,loads');
        await addPoll("Location", tomorrowDate, 2, 'here,there');
        await addPoll("Budget", '01-01-2019', 2, '£100, £200');
        await addStage("reminder", "do it", tomorrowDate, 2);
        await addTripUser(2, 3)
    });

    it("reminder service sends texts to correct users", async() => {
        await ReminderFinder.textCoordinator(fakeClient);
        await expect(fakeClient.messages.sent).toEqual( [ { to: '000',
            from: '+441424400627',
            body: 'Please fill in the dates poll.' },
            { to: '111',
                from: '+441424400627',
                body: 'Please fill in the location poll.' },
            { to: '222',
                from: '+441424400627',
                body: 'Please fill in the location poll.' },
            { to: '111', from: '+441424400627', body: 'do it' },
            { to: '222', from: '+441424400627', body: 'do it' } ])

    })
});



