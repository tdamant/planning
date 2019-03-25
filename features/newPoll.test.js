const sleep = require('sleep');
const connection = require("../database/connection");

describe('New Stage', () => {
    beforeAll(async () => {
        await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
        await sleep.sleep(1);
        await page.goto('http://localhost:5000');
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
        await page.waitForSelector("#newTripButton");
        const navigationPromise0 =  page.waitForNavigation();
        await page.click('#newTripButton');
        await navigationPromise0;
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip-name',
          });
        const navigationPromise =  page.waitForNavigation();
        await page.click('#submit');
        await navigationPromise;

    });

    it('can submit form, load relevant trip page with name and description', async () => {
        await page.select('select[name="polls"]', 'Dates');
        await expect(page).toMatch('This is where we')
      });
    });

    // it('can submit form and save details of stage', async () => {
    //   await expect(page).toFillForm('form[name="addStage"]', {
    //       stageName: 'Book flights',
    //       stageContent: 'Unique stage description',
    //       stageDueDate: `${Date.now()}`,
    //   });
    //   await page.click('#submit');
    //   sleep.sleep(1);
    //   await expect(page).toMatch('Book flights');
    // });

