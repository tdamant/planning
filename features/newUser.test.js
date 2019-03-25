const connection = require("../database/connection");
var sleep = require("sleep");
var puppeteer = require('puppeteer');

describe('Sign Up and log in', () => {
    describe("sign up", () => {
        beforeAll(async () => {
            await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
            await sleep.sleep(1);
            await page.goto('http://localhost:5000')
        });

        it('should redirect to the next page on submit', async () => {
            await page.click("#signUp");
            await sleep.sleep(1);
            await expect(page).toFillForm('form[name="signUpForm"]', {
                firstName: 'Bob',
                lastName: 'Smith',
                signInEmail: 'email@email.com',
                phoneNumber: '07790242409',
                signInPassword: 'password'
            });
            await page.click('#signUpButton');
            await page.waitForNavigation({'waitUntil': 'networkidle0'});
            await expect(page).toMatch('Welcome, Bob!');
        });

        it('should successfully save the user in the database', async () => {
            result = await connection.pool.query('SELECT * FROM users');
            expect(result.rows[0].first_name).toMatch('Bob');
        });
    });


    describe('Log In', () => {

        let browser;
        let page;

        beforeAll(async () => {
            browser = await puppeteer.launch();
            page = await browser.newPage();
            await page.goto("http://localhost:5000/")
        });

        it('should log in a known user', async () => {
            await expect(page).toFillForm('form[name="logInForm"]', {
                email: 'email@email.com',
                password: 'password'
            });
            await page.click('#logInButton');
            await page.screenshot({path: "kkkkkkk.png"});
            await expect(page).toMatch("Welcome, Bob!")
        });

    });

    describe('dismiss error alerts', () => {
        let browser;
        let page;
        beforeAll( async() => {
            browser = await puppeteer.launch();
            page = await browser.newPage();
            await page.goto("http://localhost:5000/");
            page.on('dialog', async dialog => {
                await dialog.dismiss();
            });
        });

        it('error if not a known user', async() => {
            await expect(page).toFillForm('form[name="logInForm"]', {
                email: 'wrong@email.com',
                password: 'password'
            });
            await page.click('#logInButton');
            await sleep.sleep(1);
            await expect(page).toMatch("Sign Up")
        });

        it('error if incorrect password', async() => {
            await expect(page).toFillForm('form[name="logInForm"]', {
                email: 'email@email.com',
                password: 'wrongpassword'
            });
            await page.click('#logInButton');
            await sleep.sleep(1);
            await expect(page).toMatch("Sign Up")
        });
    });

});

