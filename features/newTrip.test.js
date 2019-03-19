var sleep = require('sleep');


describe('New Trip', () => {
    beforeAll(async () => {
        sleep.sleep(1);
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
