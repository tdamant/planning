describe('New Stage', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:5000/new-trip');
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip name',
            description: 'Trip description'
          });
        await page.click('#submit');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
    });

    it('can submit form, load relevant trip page with name and description', async () => {
      await expect(page).toFillForm('form[name="addStage"]', {
          stageName: 'book flight',
          stageContent: 'Unique stage description',
          stageDueDate: '29/03/2019'
      });
    });

    it('can submit form and save details of stage', async () => {
      await expect(page).toFillForm('form[name="addStage"]', {
          stageName: 'book flight',
          stageContent: 'Unique stage description',
          stageDueDate: '29/03/2019'
      });
      await page.click('#submit');
      await page.waitForNavigation({'waitUntil': 'networkidle0'});
      await expect(page).toMatch('book flight');
    });
});
