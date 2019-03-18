describe('New Trip', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:5000/new-trip')
    });

    it('should display page header', async () => {
        await expect(page).toMatch('Set up your trip')
    });

    it('page can fill form with 3 attendees', async () => {
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Trip name',
            description: 'Trip description',
            attendee1: 'test1@test.com',
            attendee2: 'test2@test.com',
            attendee3: 'test3@test.com'
        });
    });

    it('can submit form with 3 attendees', async () => {
        await expect(page).toFillForm('form[name="addTrip"]', {
            tripName: 'Unique Trip name',
            description: 'Trip description',
            attendee1: 'test1@test.com',
            attendee2: 'test2@test.com',
            attendee3: 'test3@test.com'
        });
        await page.click('#submit');
        await page.waitForNavigation({'waitUntil': 'networkidle0'});
        await expect(page).toMatch('Unique Trip name')
    });

    // it('can submit form with 1 attendee1', async () => {
    //     await expect(page).toFillForm('form[name="addTrip"]', {
    //         tripName: 'Trip name',
    //         description: 'Trip description',
    //         attendee1: 'test1@test.com',
    //     });
    // });
});
