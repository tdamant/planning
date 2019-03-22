var sleep = require('sleep');
const connection = require("../database/connection");

describe('Sign Up', () => {
    beforeAll(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
        sleep.sleep(1);
        await page.goto('http://localhost:5000')
    });

    it('should display page header', async () => {
        await expect(page).toMatch('Sign Up')
    });

    it('should allow moving between sign up and log in', async() => {
        await page.click("#signUp");
        await expect(page).toMatch('Already have an account?');
        await page.click("#signIn");
        await expect(page).toMatch('Don\'t have an account yet?');
    })

    it('should redirect to the next page on submit', async () => {
        await page.click("#signUp");
        await sleep.sleep(1)
        await page.waitForSelector("#firstName");
        await page.screenshot({path:"test1.png"});
        await expect(page).toFillForm('form[name="signUpForm"]', {
            firstName: 'Bob',
            lastName: 'Smith',
            signInEmail: 'email@email.com',
            phoneNumber: '07790242409',
            signInPassword: 'password'
        });
        await page.click('#signUpButton');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
        await expect(page).toMatch('Welcome');
    });

    it('should successfully save the user in the database', async () => {
        result = await connection.pool.query('SELECT * FROM users');
        expect(result.rows[0].first_name).toMatch('Bob');
    });

    describe('Log In', () => {

        beforeEach(async() => {
            await page.goto("http://localhost:5000")
        });

        it('should log in a known user', async() => {
            await expect(page).toFillForm('form[name="logInForm"]', {
                email: 'email@email.com',
                password: 'password'
            });
            await page.click('#logInButton');
            await page.waitForNavigation({'waitUntil': 'networkidle0'});
            await expect(page).toMatch("Welcome")
        });

        describe('dismiss error alerts', () => {

            beforeAll( async() => {
                page.on('dialog', async dialog => {
                    await dialog.dismiss();
                });
            })

            it('error if not a known user', async() => {
                await expect(page).toFillForm('form[name="logInForm"]', {
                    email: 'unknown@email.com',
                    password: 'password'
                });
                await page.click('#logInButton');
                await expect(page).toMatch("Sign Up")
            });

            it('error if incorrect password', async() => {
                await expect(page).toFillForm('form[name="logInForm"]', {
                    email: 'email@email.com',
                    password: 'wrongpassword'
                });
                await page.click('#logInButton');
                await expect(page).toMatch("Sign Up")
            });
        });
    });
});

