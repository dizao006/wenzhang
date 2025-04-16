describe('test title', () => {
	let page;
	beforeAll(async () => {
		page = await program.currentPage();
		await page.waitFor(3000);
	});

	it('check page title', async () => {
		const el = await page.$('.container');
		console.log(el, "asdasd")
		// const titleText = await el.text();
		// expect(titleText).toEqual('旧城以西_');
	});
});