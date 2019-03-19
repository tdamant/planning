var sleep = require('sleep');
const connection = require("../database/connection");

describe('Login', () => {
    beforeAll(async () => {
        await connection.pool.query('TRUNCATE TABLE users');
        await connection.pool.query(`INSERT INTO users (first_name, last_name, email, phone_number, password) 
        VALUES ('first', 'last', 'email@email.com', '0000', 'password')`);
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
        await expect(page).toMatch('Set up your trip');
    })
});
