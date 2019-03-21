var sleep = require('sleep');
const User = require("../models/lib/users.js")
const connection = require("../database/connection");

describe('Login', () => {
    beforeAll(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
        User.addUser('first', 'last', 'email@email.com', '0000', 'password')
        sleep.sleep(1);
        await page.goto('http://localhost:5000/new-trip');
    });

    it('should display page header', async () => {
        await expect(page).toMatch('Log In:')
    });

    it('should log in when user exists in database', async () => {
        await expect(page).toFillForm('form[name="logIn"]', {
            email: 'email@email.com',
            password: 'password'
        });
        await page.click('#submit');
        await sleep.sleep(1);
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
        await expect(page).toMatch('Set up your trip');
    })
});

