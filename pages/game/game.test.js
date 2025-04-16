describe('pages/game/game.vue', () => {
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
		page = await program.reLaunch("/pages/game/game");
		// 延长等待时间确保游戏初始化完成
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(3000);
		} else {
			await page.waitFor(8000); // 小程序需要更长时间
		}
		await page.waitFor(".game-container");
	});

	// 基础元素测试
	describe('基础元素测试', () => {
		it('页面元素加载正确', async () => {
			expect(await (await page.$('.title')).text()).toBe('2048');
			expect(await (await page.$('.score-container')).text()).toBe('0');
			expect(await (await page.$('.game-intro')).text()).toBe('你能拿到2048吗？');
		});
	});

	// 游戏功能测试
	describe('游戏核心功能测试', () => {
		let gameContainer;

		beforeAll(async () => {
			gameContainer = await page.$('.game-container');
			expect(gameContainer).not.toBeNull();
		});

		// 改进的滑动模拟函数
		const simulateSwipe = async (direction = 'right') => {
			const rect = await gameContainer.boundingBox();
			const centerX = rect.x + rect.width / 2;
			const centerY = rect.y + rect.height / 2;
			const distance = 100; // 滑动距离

			let start, end;
			switch (direction) {
				case 'right':
					start = {
						x: centerX - distance,
						y: centerY
					};
					end = {
						x: centerX + distance,
						y: centerY
					};
					break;
				case 'left':
					start = {
						x: centerX + distance,
						y: centerY
					};
					end = {
						x: centerX - distance,
						y: centerY
					};
					break;
				case 'up':
					start = {
						x: centerX,
						y: centerY + distance
					};
					end = {
						x: centerX,
						y: centerY - distance
					};
					break;
				case 'down':
					start = {
						x: centerX,
						y: centerY - distance
					};
					end = {
						x: centerX,
						y: centerY + distance
					};
					break;
			}

			await program.dispatchTouchStart(start.x, start.y);
			await program.dispatchTouchMove(end.x, end.y);
			await program.dispatchTouchEnd();
			await page.waitFor(800); // 等待动画完成
		};

		it('游戏网格初始化正确', async () => {
			const gridRows = await gameContainer.$$('.grid-row');
			expect(gridRows.length).toBe(4);

			for (const row of gridRows) {
				const cells = await row.$$('.grid-cell');
				expect(cells.length).toBe(4);
			}
		});

		it('向右滑动应改变游戏状态', async () => {
			const initialScore = await (await page.$('.score-container')).text();
			await simulateSwipe('right');
			const newScore = await (await page.$('.score-container')).text();
			expect(newScore).not.toBe(initialScore);
		});

		it('重置功能应归零分数', async () => {
			// 先改变分数状态
			await simulateSwipe('right');
			await page.waitFor(500);

			const btn = await page.$('.restart-button');
			await btn.tap();
			await page.waitFor(1000);

			expect(await (await page.$('.score-container')).text()).toBe('0');
		});

		it('多方向滑动测试', async () => {
			const initialScore = await (await page.$('.score-container')).text();

			await simulateSwipe('right');
			await simulateSwipe('down');
			await simulateSwipe('left');
			await simulateSwipe('up');

			const finalScore = await (await page.$('.score-container')).text();
			expect(Number(finalScore)).toBeGreaterThan(Number(initialScore));
		});
	});

	// 游戏状态测试
	describe('游戏状态测试', () => {
		it('游戏胜利状态检测', async () => {
			// 模拟多次操作直到胜利（简化版）
			for (let i = 0; i < 15; i++) {
				await (await program.currentPage()).evaluate(() => {
					// 这里应该有直接设置游戏状态的代码
					// 例如：window.gameManager.reach2048();
				});
				await page.waitFor(300);
			}

			const gameWon = await page.$('.game-won');
			expect(gameWon).not.toBeNull();
			expect(await (await gameWon.$('.over-msg')).text()).toBe('恭喜');
		});

		it('游戏结束状态检测', async () => {
			// 模拟游戏结束状态
			await (await program.currentPage()).evaluate(() => {
				// 这里应该有直接设置游戏结束的代码
				// 例如：window.gameManager.gameOver();
			});
			await page.waitFor(500);

			const gameOver = await page.$('.game-over');
			expect(gameOver).not.toBeNull();
			expect(await (await gameOver.$('.over-msg')).text()).toBe('游戏结束');
		});
	});

	// 边界测试
	describe('边界测试', () => {
		it('在游戏区域外滑动应无效', async () => {
			const initialScore = await (await page.$('.score-container')).text();

			// 在游戏区域上方滑动
			await program.dispatchTouchStart(100, 50);
			await program.dispatchTouchMove(300, 50);
			await program.dispatchTouchEnd();
			await page.waitFor(500);

			expect(await (await page.$('.score-container')).text()).toBe(initialScore);
		});

		it('极小滑动距离应无效', async () => {
			const gameContainer = await page.$('.game-container');
			const rect = await gameContainer.boundingBox();
			const initialScore = await (await page.$('.score-container')).text();

			// 滑动距离小于阈值
			await program.dispatchTouchStart(rect.x + 50, rect.y + 50);
			await program.dispatchTouchMove(rect.x + 55, rect.y + 50); // 只滑动5px
			await program.dispatchTouchEnd();
			await page.waitFor(500);

			expect(await (await page.$('.score-container')).text()).toBe(initialScore);
		});
	});
});