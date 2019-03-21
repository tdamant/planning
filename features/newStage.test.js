const sleep = require('sleep');
const connection = require("../database/connection");

describe('New Stage', () => {
    beforeAll(async () => {
        // await connection.pool.query("TRUNCATE TABLE stages, trips, users, trips_users, stages_users RESTART IDENTITY");
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
        await page.goto('http://localhost:5000/new-trip');
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip-name',
            description: 'Trip description'
          });
        await page.evaluate(() => {
            localStorage.setItem("tripName", "Trip-name");
        });
        await page.click('#submit');

        await page.waitForNavigation();
    });

    it('can submit form, load relevant trip page with name and description', async () => {
      await expect(page).toFillForm('form[name="addStage"]', {
          stageName: 'Book flights',
          stageContent: 'Unique stage description',
          stageDueDate: `${Date.now()}`,
      });
    });

    it('can submit form and save details of stage', async () => {
      await expect(page).toFillForm('form[name="addStage"]', {
          stageName: 'Book flights',
          stageContent: 'Unique stage description',
          stageDueDate: `${Date.now()}`,
      });
      await page.click('#submit');
      sleep.sleep(1);
      await expect(page).toMatch('Book flights');
    });
});
