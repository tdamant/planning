const sleep = require('sleep');
const connection = require("../database/connection");
const User = require("../models/lib/users.js");


describe('New Stage', () => {
    beforeEach(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users, polls, votes, comments RESTART IDENTITY");
        await User.addUser("Tom", "Damant", "tomdamant@hotmail.com", "07588468084",  "strongpassword");
        sleep.sleep(1);
        var cookie = [
            {
                "domain": "localhost",
                "expirationDate": 1597288045,
                "hostOnly": false,
                "httpOnly": true,
                "name": "user",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 1
            }
        ];
        await page.setCookie(...cookie);
        await page.goto('http://localhost:5000/newTrip')

        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Unique Trip name',
            description: 'Trip description'
        });
        await page.click('#submit');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
    });

    describe("Skip to Trip Home", () => {
        it('should click through to tripHome', async () => {
            await page.click("#skip");
            await page.waitForNavigation({'waitUntil': 'networkidle0'});
            await expect(page).toMatch("UNIQUE TRIP NAME")
        })
    });

    // describe("New poll", () => {
        // it('can add a poll', async () => {
        //     await page.select('#polls',  'Dates');
        //     await page.click("#buildPoll");
        //     /// NEED TO INPUT OPTIONS & deadline before submitting
        //     await page.click("#submit");
        //     await expect(page).toMatch("Dates")
        // });
    // close polls/ no deadline

    // });

    describe("Progress to invite Guests", () => {
        it('should click through to guests page', async () => {
            await page.click("#guests");
            await page.waitForNavigation({'waitUntil': 'networkidle0'});
            await expect(page).toMatch("Time to invite others")
        });

        it('should click through to trip home', async () => {
            await page.click("#guests");
            await page.click("#saveGuests");
            await page.waitForNavigation({'waitUntil': 'networkidle0'});
            await expect(page).toMatch("UNIQUE TRIP NAME")
        });
    });




});
