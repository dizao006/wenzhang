<template>
	<view class="container">
		<view class="game-body">
			<view class="heading">
				<text class="title">2048</text>
				<view class="scores-container">
					<view class="score-container">{{ score }}</view>
					<view class="best-container">{{ highscore || 0 }}</view>
				</view>
			</view>
			<view class="above-game">
				<text class="game-intro">你能拿到2048吗？</text>
				<text class="restart-button" @click="restart">新游戏</text>
			</view>
			<view class="game-container">
				<view class="game-message" :class="won ? 'game-won' : ''">
					<text class="over-msg">{{ dataMsg }}</text>
					<view class="lower">
						<text class="retry-button" @click="restart">再试一次</text>
					</view>
				</view>
				<view class="game-message" :class="over ? 'game-over' : ''">
					<text class="over-msg">{{ dataMsg }}</text>
					<view class="lower">
						<text class="retry-button" @click="restart">再试一次</text>
					</view>
				</view>
				<view class="grid-container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
					<view v-for="row in grids" class="grid-row">
						<view v-for="item in row" class="grid-cell">
							<view :class="item != null ? 'tile tile-' + item.value : ''">
								<view v-if="item" class="tile-inner">
									{{ item.value }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		GameManager
	} from "./game_manager.js";


	export default {
		setup() {
			const score = ref(0);
			const highscore = ref(0);
			const grids = ref([]);
			const touchStartX = ref(0);
			const touchStartY = ref(0);
			const touchEndX = ref(0);
			const touchEndY = ref(0);
			const isMultiple = ref(false);
			const won = ref(false);
			const over = ref(false);
			const dataMsg = ref("游戏结束");
			let gameManager;
			onMounted(() => {
				gameManager = new GameManager(4);
				grids.value = gameManager.setup();
				console.log(grids.value, "setup");
				highscore.value = uni.getStorageSync("highScore") || 0;
			});

			const restart = () => {
				updateView({
					grids: gameManager.restart(),
					score: 0,
					won: false,
					over: false,
				});
			};

			const updateView = (data) => {
				if (data.over) {
					dataMsg.value = "游戏结束";
				}
				if (data.won) {
					dataMsg.value = "恭喜";
				}
				grids.value = [...data.grids]
				score.value = data.score;
				highscore.value = Math.max(highscore.value, data.score)
				won.value = data.won;
				over.value = data.over;
			};

			const touchStart = (events) => {
				isMultiple.value = events.touches.length > 1;
				if (isMultiple.value) {
					return;
				}
				const touch = events.touches[0];
				touchStartX.value = touch.clientX;
				touchStartY.value = touch.clientY;
			};

			const touchMove = (events) => {
				const touch = events.touches[0];
				touchEndX.value = touch.clientX;
				touchEndY.value = touch.clientY;
			};

			const touchEnd = () => {
				if (isMultiple.value) {
					return;
				}
				const dx = touchEndX.value - touchStartX.value;
				const dy = touchEndY.value - touchStartY.value;
				const absX = Math.abs(dx);
				const absY = Math.abs(dy);
				if (Math.max(absX, absY) > 10) {
					const direction = absX > absY ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 4;
					const data = gameManager.move(direction);
					if (data) {
						let highscoreValue = uni.getStorageSync("highScore") || 0;
						highscoreValue = Math.max(highscoreValue, data.score);
						uni.setStorageSync("highScore", highscoreValue);

						updateView({
							grids: data.grids,
							score: data.score,
							highScore: highscoreValue,
							won: data.won,
							over: data.over,
						});
					}
				}
			};

			return {
				score,
				highscore,
				grids,
				dataMsg,
				won,
				over,
				restart,
				touchStart,
				touchMove,
				touchEnd,
			};
		},
	};
</script>

<style>
	.container {
		margin: 0;
		padding: 20px 0;
		background: #faf8ef;
		color: #776e65;
		font-family: "Helvetica Neue", Arial, sans-serif;
		font-size: 18px;
	}

	.heading:after {
		content: "";
		display: block;
		clear: both;
	}

	.title {
		font-size: 80px;
		font-weight: bold;
		margin: 0;
		display: block;
		float: left;
	}

	.scores-container {
		float: right;
		text-align: right;
	}

	.score-container,
	.best-container {
		position: relative;
		display: inline-block;
		background: #bbada0;
		padding: 15px 25px;
		font-size: 25px;
		height: 52px;
		line-height: 47px;
		font-weight: bold;
		border-radius: 3px;
		color: white;
		text-align: center;
		margin: 8px 0 0 8px;
	}

	.score-container:after,
	.best-container:after {
		position: absolute;
		width: 100%;
		top: 10px;
		left: 0;
		text-transform: uppercase;
		font-size: 13px;
		line-height: 13px;
		text-align: center;
		color: #eee4da;
	}

	.score-container .score-addition,
	.best-container .score-addition {
		position: absolute;
		right: 30px;
		color: red;
		font-size: 25px;
		line-height: 25px;
		font-weight: bold;
		color: rgba(119, 110, 101, 0.9);
		z-index: 100;
	}

	.score-container:after {
		content: "Score";
	}

	.best-container:after {
		content: "Best";
	}

	p {
		margin-top: 0;
		margin-bottom: 10px;
		line-height: 1.65;
	}

	a {
		color: #776e65;
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
	}

	strong.important {
		text-transform: uppercase;
	}

	hr {
		border: none;
		border-bottom: 1px solid #d8d4d0;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.game-container {
		margin-top: 40px;
		position: relative;
		padding: 15px;
		cursor: default;
		-webkit-touch-callout: none;
		-ms-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-ms-touch-action: none;
		touch-action: none;
		background: #bbada0;
		border-radius: 6px;
		width: 500px;
		height: 500px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.game-container .game-message {
		/*display: none;*/
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(238, 228, 218, 0.5);
		z-index: 100;
		text-align: center;
	}

	.game-container .game-message p {
		font-size: 60px;
		font-weight: bold;
		height: 60px;
		line-height: 60px;
		margin-top: 222px;
	}

	.game-container .game-message .lower {
		display: block;
		margin-top: 59px;
	}

	.game-container .game-message a {
		display: inline-block;
		background: #8f7a66;
		border-radius: 3px;
		padding: 0 20px;
		text-decoration: none;
		color: #f9f6f2;
		height: 40px;
		line-height: 42px;
		margin-left: 9px;
	}

	.game-container .game-message .keep-playing-button {
		display: none;
	}

	.game-container .game-message.game-won {
		background: rgba(237, 194, 46, 0.5);
		color: #f9f6f2;
	}

	.game-container .game-message.game-won .keep-playing-button {
		display: inline-block;
	}

	.game-container .game-message.game-won,
	.game-container .game-message.game-over {
		display: block;
	}

	.grid-container {
		position: absolute;
		z-index: 1;
	}

	.grid-row {
		margin-bottom: 15px;
	}

	.grid-row:last-child {
		margin-bottom: 0;
	}

	.grid-row:after {
		content: "";
		display: block;
		clear: both;
	}

	.grid-cell {
		width: 106.25px;
		height: 106.25px;
		margin-right: 15px;
		float: left;
		border-radius: 3px;
		background: rgba(238, 228, 218, 0.35);
	}

	.grid-cell:last-child {
		margin-right: 0;
	}

	.tile-container {
		position: absolute;
		z-index: 2;
	}

	.tile,
	.tile .tile-inner {
		width: 107px;
		height: 107px;
		line-height: 107px;
	}

	.tile.tile-position-1-1 {
		-webkit-transform: translate(0px, 0px);
		-moz-transform: translate(0px, 0px);
		-ms-transform: translate(0px, 0px);
		transform: translate(0px, 0px);
	}

	.tile.tile-position-1-2 {
		-webkit-transform: translate(0px, 121px);
		-moz-transform: translate(0px, 121px);
		-ms-transform: translate(0px, 121px);
		transform: translate(0px, 121px);
	}

	.tile.tile-position-1-3 {
		-webkit-transform: translate(0px, 242px);
		-moz-transform: translate(0px, 242px);
		-ms-transform: translate(0px, 242px);
		transform: translate(0px, 242px);
	}

	.tile.tile-position-1-4 {
		-webkit-transform: translate(0px, 363px);
		-moz-transform: translate(0px, 363px);
		-ms-transform: translate(0px, 363px);
		transform: translate(0px, 363px);
	}

	.tile.tile-position-2-1 {
		-webkit-transform: translate(121px, 0px);
		-moz-transform: translate(121px, 0px);
		-ms-transform: translate(121px, 0px);
		transform: translate(121px, 0px);
	}

	.tile.tile-position-2-2 {
		-webkit-transform: translate(121px, 121px);
		-moz-transform: translate(121px, 121px);
		-ms-transform: translate(121px, 121px);
		transform: translate(121px, 121px);
	}

	.tile.tile-position-2-3 {
		-webkit-transform: translate(121px, 242px);
		-moz-transform: translate(121px, 242px);
		-ms-transform: translate(121px, 242px);
		transform: translate(121px, 242px);
	}

	.tile.tile-position-2-4 {
		-webkit-transform: translate(121px, 363px);
		-moz-transform: translate(121px, 363px);
		-ms-transform: translate(121px, 363px);
		transform: translate(121px, 363px);
	}

	.tile.tile-position-3-1 {
		-webkit-transform: translate(242px, 0px);
		-moz-transform: translate(242px, 0px);
		-ms-transform: translate(242px, 0px);
		transform: translate(242px, 0px);
	}

	.tile.tile-position-3-2 {
		-webkit-transform: translate(242px, 121px);
		-moz-transform: translate(242px, 121px);
		-ms-transform: translate(242px, 121px);
		transform: translate(242px, 121px);
	}

	.tile.tile-position-3-3 {
		-webkit-transform: translate(242px, 242px);
		-moz-transform: translate(242px, 242px);
		-ms-transform: translate(242px, 242px);
		transform: translate(242px, 242px);
	}

	.tile.tile-position-3-4 {
		-webkit-transform: translate(242px, 363px);
		-moz-transform: translate(242px, 363px);
		-ms-transform: translate(242px, 363px);
		transform: translate(242px, 363px);
	}

	.tile.tile-position-4-1 {
		-webkit-transform: translate(363px, 0px);
		-moz-transform: translate(363px, 0px);
		-ms-transform: translate(363px, 0px);
		transform: translate(363px, 0px);
	}

	.tile.tile-position-4-2 {
		-webkit-transform: translate(363px, 121px);
		-moz-transform: translate(363px, 121px);
		-ms-transform: translate(363px, 121px);
		transform: translate(363px, 121px);
	}

	.tile.tile-position-4-3 {
		-webkit-transform: translate(363px, 242px);
		-moz-transform: translate(363px, 242px);
		-ms-transform: translate(363px, 242px);
		transform: translate(363px, 242px);
	}

	.tile.tile-position-4-4 {
		-webkit-transform: translate(363px, 363px);
		-moz-transform: translate(363px, 363px);
		-ms-transform: translate(363px, 363px);
		transform: translate(363px, 363px);
	}

	.tile {
		position: absolute;
		-webkit-transition: 100ms ease-in-out;
		-moz-transition: 100ms ease-in-out;
		transition: 100ms ease-in-out;
		-webkit-transition-property: -webkit-transform;
		-moz-transition-property: -moz-transform;
		transition-property: transform;
	}

	.tile .tile-inner {
		border-radius: 3px;
		background: #eee4da;
		text-align: center;
		font-weight: bold;
		z-index: 10;
		font-size: 55px;
	}

	.tile.tile-2 .tile-inner {
		background: #eee4da;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
			inset 0 0 0 1px rgba(255, 255, 255, 0);
	}

	.tile.tile-4 .tile-inner {
		background: #ede0c8;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
			inset 0 0 0 1px rgba(255, 255, 255, 0);
	}

	.tile.tile-8 .tile-inner {
		color: #f9f6f2;
		background: #f2b179;
	}

	.tile.tile-16 .tile-inner {
		color: #f9f6f2;
		background: #f59563;
	}

	.tile.tile-32 .tile-inner {
		color: #f9f6f2;
		background: #f67c5f;
	}

	.tile.tile-64 .tile-inner {
		color: #f9f6f2;
		background: #f65e3b;
	}

	.tile.tile-128 .tile-inner {
		color: #f9f6f2;
		background: #edcf72;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381),
			inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
		font-size: 45px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-128 .tile-inner {
			font-size: 25px;
		}
	}

	.tile.tile-256 .tile-inner {
		color: #f9f6f2;
		background: #edcc61;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746),
			inset 0 0 0 1px rgba(255, 255, 255, 0.19048);
		font-size: 45px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-256 .tile-inner {
			font-size: 25px;
		}
	}

	.tile.tile-512 .tile-inner {
		color: #f9f6f2;
		background: #edc850;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683),
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
		font-size: 45px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-512 .tile-inner {
			font-size: 25px;
		}
	}

	.tile.tile-1024 .tile-inner {
		color: #f9f6f2;
		background: #edc53f;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619),
			inset 0 0 0 1px rgba(255, 255, 255, 0.28571);
		font-size: 35px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-1024 .tile-inner {
			font-size: 15px;
		}
	}

	.tile.tile-2048 .tile-inner {
		color: #f9f6f2;
		background: #edc22e;
		box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
			inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
		font-size: 35px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-2048 .tile-inner {
			font-size: 15px;
		}
	}

	.tile.tile-super .tile-inner {
		color: #f9f6f2;
		background: #3c3a32;
		font-size: 30px;
	}

	@media screen and (max-width: 520px) {
		.tile.tile-super .tile-inner {
			font-size: 10px;
		}
	}

	.tile-merged .tile-inner {
		z-index: 20;
	}

	.above-game:after {
		content: "";
		display: block;
		clear: both;
	}

	.game-intro {
		float: left;
		line-height: 42px;
		margin-bottom: 0;
	}

	.restart-button {
		display: inline-block;
		background: #8f7a66;
		border-radius: 3px;
		padding: 0 20px;
		text-decoration: none;
		color: #f9f6f2;
		height: 40px;
		line-height: 42px;
		display: block;
		text-align: center;
		float: right;
	}

	.game-explanation {
		margin-top: 50px;
	}

	@media screen and (max-width: 520px) {

		html,
		body {
			font-size: 15px;
		}

		/* body {
    margin: 20px 0;
    padding: 0 20px;
  } */
		.title {
			font-size: 27px;
			margin-top: 15px;
		}

		.container {
			width: 100%;
			margin: 0 auto;
			min-width: 280px;
		}

		.score-container,
		.best-container {
			margin-top: 0;
			padding: 15px 10px;
			min-width: 75px;
		}

		.heading {
			margin-bottom: 10px;
			padding: 0 20px;
		}

		.above-game {
			padding: 0 20px;
		}

		.game-intro {
			width: 55%;
			display: block;
			box-sizing: border-box;
			line-height: 2.65;
		}

		.restart-button {
			width: 42%;
			padding: 0;
			display: block;
			box-sizing: border-box;
			margin-top: 2px;
		}

		.game-container {
			margin-top: 17px;
			position: relative;
			padding: 10px;
			cursor: default;
			-webkit-touch-callout: none;
			-ms-touch-callout: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-ms-touch-action: none;
			touch-action: none;
			background: #bbada0;
			border-radius: 6px;
			width: 280px;
			height: 280px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}

		.game-container .game-message {
			display: none;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(238, 228, 218, 0.5);
			z-index: 100;
			text-align: center;
		}

		.game-container .game-message .over-msg {
			display: block;
			font-size: 30px;
			font-weight: bold;
			height: 30px;
			line-height: 30px;
			/*margin-top: 222px;*/
			margin-top: 59px;
		}

		.game-container .game-message .lower {
			display: block;
			margin-top: 59px;
		}

		.game-container .game-message .retry-button {
			display: inline-block;
			background: #8f7a66;
			border-radius: 3px;
			padding: 0 20px;
			text-decoration: none;
			color: #f9f6f2;
			height: 40px;
			line-height: 42px;
			margin-left: 9px;
		}

		.game-container .game-message .keep-playing-button {
			display: none;
		}

		.game-container .game-message.game-won {
			background: rgba(237, 194, 46, 0.5);
			color: #f9f6f2;
		}

		.game-container .game-message.game-won .keep-playing-button {
			display: inline-block;
		}

		.game-container .game-message.game-won,
		.game-container .game-message.game-over {
			display: block;
		}

		.grid-container {
			position: absolute;
			z-index: 1;
		}

		.grid-row {
			margin-bottom: 10px;
		}

		.grid-row:last-child {
			margin-bottom: 0;
		}

		.grid-row:after {
			content: "";
			display: block;
			clear: both;
		}

		.grid-cell {
			width: 57.5px;
			height: 57.5px;
			margin-right: 10px;
			float: left;
			border-radius: 3px;
			background: rgba(238, 228, 218, 0.35);
		}

		.grid-cell:last-child {
			margin-right: 0;
		}

		.tile,
		.tile .tile-inner {
			width: 58px;
			height: 58px;
			line-height: 58px;
		}

		.tile.tile-position-1-1 {
			-webkit-transform: translate(0px, 0px);
			-moz-transform: translate(0px, 0px);
			-ms-transform: translate(0px, 0px);
			transform: translate(0px, 0px);
		}

		.tile.tile-position-1-2 {
			-webkit-transform: translate(0px, 67px);
			-moz-transform: translate(0px, 67px);
			-ms-transform: translate(0px, 67px);
			transform: translate(0px, 67px);
		}

		.tile.tile-position-1-3 {
			-webkit-transform: translate(0px, 135px);
			-moz-transform: translate(0px, 135px);
			-ms-transform: translate(0px, 135px);
			transform: translate(0px, 135px);
		}

		.tile.tile-position-1-4 {
			-webkit-transform: translate(0px, 202px);
			-moz-transform: translate(0px, 202px);
			-ms-transform: translate(0px, 202px);
			transform: translate(0px, 202px);
		}

		.tile.tile-position-2-1 {
			-webkit-transform: translate(67px, 0px);
			-moz-transform: translate(67px, 0px);
			-ms-transform: translate(67px, 0px);
			transform: translate(67px, 0px);
		}

		.tile.tile-position-2-2 {
			-webkit-transform: translate(67px, 67px);
			-moz-transform: translate(67px, 67px);
			-ms-transform: translate(67px, 67px);
			transform: translate(67px, 67px);
		}

		.tile.tile-position-2-3 {
			-webkit-transform: translate(67px, 135px);
			-moz-transform: translate(67px, 135px);
			-ms-transform: translate(67px, 135px);
			transform: translate(67px, 135px);
		}

		.tile.tile-position-2-4 {
			-webkit-transform: translate(67px, 202px);
			-moz-transform: translate(67px, 202px);
			-ms-transform: translate(67px, 202px);
			transform: translate(67px, 202px);
		}

		.tile.tile-position-3-1 {
			-webkit-transform: translate(135px, 0px);
			-moz-transform: translate(135px, 0px);
			-ms-transform: translate(135px, 0px);
			transform: translate(135px, 0px);
		}

		.tile.tile-position-3-2 {
			-webkit-transform: translate(135px, 67px);
			-moz-transform: translate(135px, 67px);
			-ms-transform: translate(135px, 67px);
			transform: translate(135px, 67px);
		}

		.tile.tile-position-3-3 {
			-webkit-transform: translate(135px, 135px);
			-moz-transform: translate(135px, 135px);
			-ms-transform: translate(135px, 135px);
			transform: translate(135px, 135px);
		}

		.tile.tile-position-3-4 {
			-webkit-transform: translate(135px, 202px);
			-moz-transform: translate(135px, 202px);
			-ms-transform: translate(135px, 202px);
			transform: translate(135px, 202px);
		}

		.tile.tile-position-4-1 {
			-webkit-transform: translate(202px, 0px);
			-moz-transform: translate(202px, 0px);
			-ms-transform: translate(202px, 0px);
			transform: translate(202px, 0px);
		}

		.tile.tile-position-4-2 {
			-webkit-transform: translate(202px, 67px);
			-moz-transform: translate(202px, 67px);
			-ms-transform: translate(202px, 67px);
			transform: translate(202px, 67px);
		}

		.tile.tile-position-4-3 {
			-webkit-transform: translate(202px, 135px);
			-moz-transform: translate(202px, 135px);
			-ms-transform: translate(202px, 135px);
			transform: translate(202px, 135px);
		}

		.tile.tile-position-4-4 {
			-webkit-transform: translate(202px, 202px);
			-moz-transform: translate(202px, 202px);
			-ms-transform: translate(202px, 202px);
			transform: translate(202px, 202px);
		}

		.tile .tile-inner {
			font-size: 35px;
		}

		.game-message p {
			font-size: 30px !important;
			height: 30px !important;
			line-height: 30px !important;
			margin-top: 90px !important;
		}

		.game-message .lower {
			margin-top: 30px !important;
		}
	}
</style>