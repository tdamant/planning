const sleep = require('sleep')

describe('New Stage', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:5000/new-trip');
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip-name',
            description: 'Trip description'
          });
        await page.evaluate(() => {
            localStorage.setItem("tripName", "Trip-name");
        });
        await page.click('#submit');

        await page.waitForNavigation({'waitUntil': 'networkidle0'});
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
