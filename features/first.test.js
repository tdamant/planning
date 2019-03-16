describe('hello world', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:5000/')
    });

    it('should display hello world on page', async () => {
        await expect(page).toMatch('hello world!')
    })
})