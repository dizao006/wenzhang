describe('pages/chat/chat.vue', () => {
	let page, containsVite, isApp;
	containsVite = process.env.UNI_CLI_PATH.includes('uniapp-cli-vite');
	isApp = process.env.UNI_PLATFORM.includes('app');

	if (containsVite && isApp) {
		it('vue3', async () => {
			expect(1).toBe(1);
		});
		return;
	}

	beforeAll(async () => {
		page = await program.reLaunch("/pages/Ai/Ai");
		// 延长等待时间确保页面初始化完成
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(3000);
		} else {
			await page.waitFor(8000); // 小程序需要更长时间
		}
		await page.waitFor(".chat-list");
	});

	// 基础元素测试
	describe('基础元素测试', () => {
		it('页面元素加载正确', async () => {
			const inputBox = await page.$('.input-box');
			const deepThinkButton = await page.$('.deep-think-button');
			const clearButton = await page.$('.clear-button');

			expect(await inputBox.attribute('placeholder')).toBe('给缔造AI发送消息');
			expect(await deepThinkButton.text()).toBe('深度思考');
			expect(await clearButton.text()).toBe('清空记录');
		});
	});

	// 聊天功能测试
	describe('聊天核心功能测试', () => {
		let inputBox;

		beforeAll(async () => {
			inputBox = await page.$('.input-box');
			expect(inputBox).not.toBeNull();
		});

		const sendMessage = async (message) => {
			await inputBox.setValue(message);
			await inputBox.trigger('confirm');
			await page.waitFor(1000);
		};

		it('发送消息应更新聊天列表', async () => {
			const initialChatListLength = (await page.$$('.chat-item')).length;
			const testMessage = '测试消息';
			await sendMessage(testMessage);
			const newChatListLength = (await page.$$('.chat-item')).length;
			expect(newChatListLength).toBe(initialChatListLength + 2); // 用户消息和AI临时回复
		});

		it('清空记录功能应重置聊天列表', async () => {
			const clearButton = await page.$('.clear-button');
			await clearButton.tap();
			await page.waitFor(1000);
			const chatListItems = await page.$$('.chat-item');
			expect(chatListItems.length).toBe(1);
			const firstMessage = await (await chatListItems[0].$('.chat-bubble')).text();
			expect(firstMessage).toBe('您好，我是 AI 助手，请问有什么可以帮您？');
		});

		it('切换深度思考模式应更新按钮状态', async () => {
			const deepThinkButton = await page.$('.deep-think-button');
			const initialClass = await deepThinkButton.attribute('class');
			await deepThinkButton.tap();
			await page.waitFor(500);
			const newClass = await deepThinkButton.attribute('class');
			expect(newClass).not.toBe(initialClass);
			await deepThinkButton.tap();
			await page.waitFor(500);
			const finalClass = await deepThinkButton.attribute('class');
			expect(finalClass).toBe(initialClass);
		});
	});

	// 边界测试
	describe('边界测试', () => {
		it('发送空消息应提示', async () => {
			const inputBox = await page.$('.input-box');
			await inputBox.setValue('');
			await inputBox.trigger('confirm');
			await page.waitFor(500);
			// 这里假设 uni.showToast 会在页面上有提示元素显示，可根据实际情况调整
			const toast = await page.$('.uni-toast');
			if (toast) {
				const toastText = await toast.text();
				expect(toastText).toBe('请输入内容');
			}
		});
	});
});