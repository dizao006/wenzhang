describe('智能助手简化测试', () => {
	let page;

	beforeAll(async () => {
		// 启动测试页面
		page = await program.reLaunch('/pages/ai2/ai2');
		await page.waitFor(1500); // 等待页面加载
	});

	// 测试1：验证关键元素存在 - 这个测试已经通过
	it('应包含基本页面元素', async () => {
		expect(await page.$('.header')).not.toBeNull();
		expect(await page.$('.user-info')).not.toBeNull();
		expect(await page.$('.avatar')).not.toBeNull();
		expect(await page.$('.chat-container')).not.toBeNull();
		expect(await page.$('.message-list')).not.toBeNull();
		expect(await page.$('.input-area')).not.toBeNull();
		expect(await page.$('.input')).not.toBeNull();
		expect(await page.$('.send-btn')).not.toBeNull();
	});
});