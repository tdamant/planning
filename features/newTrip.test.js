var sleep = require('sleep');
const connection = require("../database/connection");
const User = require("../models/lib/users.js");



describe('New Trip', () => {
    beforeAll(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, users, trips, trips_users RESTART IDENTITY");
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
        await page.goto('http://localhost:5000/new-trip')
    });


    it('should display page header', async () => {
        await expect(page).toMatch('Set up your trip')
    });

    it('page can fill form', async () => {
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip name',
            description: 'Trip description'
        });
    });

    it('can submit form, load relevant trip page with name and description', async () => {
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Unique Trip name',
            description: 'Trip description'
        });
        await page.click('#submit');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
        await expect(page).toMatch('Unique Trip name');
        await expect(page).toMatch('Trip description')
    });
});
