var sleep = require('sleep');
const connection = require("../database/connection");
// const puppeteer = require("puppeteer");



describe('New User', () => {
    beforeAll(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users RESTART IDENTITY");
        sleep.sleep(1);
        await page.goto('http://localhost:5000/sign_up')
    });

    it('should display page header', async () => {
        await expect(page).toMatch('Sign Up:')
    });

    it('should redirect to the next page on submit', async () => {
        await expect(page).toFillForm('form[name="signUp"]', {
            firstName: 'Bob',
            lastName: 'Smith',
            email: 'email@email.com',
            phoneNumber: '07790242409',
            password: 'password'
        });
        await page.click('#submit');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
        await expect(page).toMatch('You signed up!');
    })

    it('should successfully save the user in the database', async () => {
        result = await connection.pool.query('SELECT * FROM users');
        expect(result.rows[0].first_name).toMatch('Bob');
    })

});
