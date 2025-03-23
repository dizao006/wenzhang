<template>
	<view class="container">
		<!-- 聊天记录 -->
		<scroll-view ref="scrollView" class="chat-list" scroll-y="true"
			:scroll-into-view="'chat-item-' + (chatList.length - 1)" scroll-with-animation>
			<view v-for="(item, index) in chatList" :key="index" :id="'chat-item-' + index" class="chat-item">
				<!-- 根据 role 决定是否显示图标 -->
				<view v-if="item.role === 'ai' && item.content" style="transform: translate(-3px,35px);">
					<uni-icons type="chat-filled" size="30"></uni-icons>
				</view>
				<view :class="['chat-bubble', item.role === 'user' ? 'user-bubble' : 'ai-bubble']"
					style="transform: translateX(30px);">
					<text>{{ item.content }}</text>
					<!-- AI 回复时的 Loading 动画 -->
					<view v-if="item.role === 'ai' && item.loading" class="loading">
						<text>...</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 输入框和按钮区域 -->
		<view class="input-area">
			<!-- 输入框 -->
			<view style="display: flex;">
				<input v-model="inputText" class="input-box" placeholder="给缔造AI发送消息" @confirm="sendMessage" />
				<view style="border-radius: 50%; background-color: ;">
					<uni-icons type="navigate-filled" size="35"></uni-icons>
				</view>
			</view>
			<!-- 按钮区域 -->
			<view class="button-area">
				<view :class="['deep-think-button', isDeepThinking ? 'active' : '']" @click="toggleDeepThinking">
					<text>深度思考</text>
				</view>
				<view class="clear-button" @click="clearHistory">
					<text>清空记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick
	} from 'vue';
	import {
		main,
		clearHistory as clearApiHistory,
		setBackground
	} from '@/common/ai.js';
	import getAarticleDetatil from "../../ajax/api/interface/getAarticleDetatil";
	const parm = defineProps(["articleId"]);
	console.log(parm, " parm")
	// 聊天记录
	const chatList = ref([]);

	// 输入框内容
	const inputText = ref('');

	// 是否开启深度思考
	const isDeepThinking = ref(false);

	// 获取 scroll-view 的引用
	const scrollView = ref();
	const artic = ref();

	// 加载本地存储的聊天记录
	const loadChatHistory = () => {
		const history = uni.getStorageSync('chatHistory');
		if (history) {
			chatList.value = history;
		} else {
			// 如果没有历史记录，初始化一条欢迎消息
			chatList.value = [{
				role: 'ai',
				content: '您好，我是 AI 助手，请问有什么可以帮您？',
			}];
		}
	};

	// 保存聊天记录到本地存储
	const saveChatHistory = () => {
		uni.setStorageSync('chatHistory', chatList.value);
	};

	// 页面加载时加载聊天记录
	onMounted(async () => {
		loadChatHistory();
		// console.log(parm, "parm.articleId")
		if (parm.articleId) {
			artic.value = await getAarticleDetatil({
				articleId: parm.articleId,
			});
			// 将文章内容作为背景信息发送给 AI
			if (artic.value && artic.value.content) {
				setBackground(artic.value.content);
			}
		}
	});

	// 发送消息
	const sendMessage = async () => {
		if (!inputText.value.trim()) {
			uni.showToast({
				title: '请输入内容',
				icon: 'none',
			});
			return;
		}

		// 添加用户消息
		chatList.value.push({
			role: 'user',
			content: inputText.value,
		});

		// 清空输入框
		const userMessage = inputText.value;
		inputText.value = '';

		// 添加 AI 的临时回复
		chatList.value.push({
			role: 'ai',
			content: '思考中...\n',
			loading: true,
		});

		// 确保视图更新
		await nextTick();

		// 调用 AI 函数处理用户消息
		try {
			await main(userMessage, (chunk) => {
				// 逐步更新 AI 回复
				const lastMessage = chatList.value[chatList.value.length - 1];
				lastMessage.content += chunk;

				// 确保视图更新
				nextTick();
			}, isDeepThinking.value);
		} catch (error) {
			console.error('请求出错:', error);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
			});
			chatList.value[chatList.value.length - 1].content = '请求失败，请重试';
		} finally {
			// 关闭 Loading 动画
			const lastMessage = chatList.value[chatList.value.length - 1];
			lastMessage.loading = false;
			// 保存聊天记录
			saveChatHistory();
		}
	};

	// 切换深度思考模式
	const toggleDeepThinking = () => {
		isDeepThinking.value = !isDeepThinking.value;
		uni.showToast({
			title: isDeepThinking.value ? '已开启深度思考' : '已关闭深度思考',
			icon: 'none',
		});
	};

	// 清空历史记录
	const clearHistory = () => {
		clearApiHistory(); // 清空 API 的历史记录
		chatList.value = [{
			role: 'ai',
			content: '您好，我是 AI 助手，请问有什么可以帮您？',
		}]; // 重置聊天记录
		uni.removeStorageSync('chatHistory'); // 清空本地存储
	};
</script>
<style>
	/* 页面容器 */
	.container {
		display: flex;
		flex-direction: column;
		height: 93vh;
		background-color: #f5f5f5;
	}

	/* 聊天记录区域 */
	.chat-list {
		flex: 1;
		padding: 20rpx;
		overflow-y: auto;
	}

	/* 聊天气泡 */
	.chat-bubble {
		max-width: 70%;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		position: relative;
		word-wrap: break-word;
	}

	/* 用户气泡 */
	.user-bubble {
		background-color: #007aff;
		color: white;
		margin-left: auto;
	}

	/* AI 气泡 */
	.ai-bubble {
		background-color: #e5e5ea;
		color: black;
		margin-right: auto;
	}

	/* Loading 动画 */
	.loading {
		position: absolute;
		bottom: -20rpx;
		right: 10rpx;
		font-size: 24rpx;
		color: #666;
	}

	/* 输入框和按钮区域 */
	.input-area {
		padding: 20rpx;
		background-color: white;
		border-top: 1rpx solid #ddd;
	}

	/* 输入框 */
	.input-box {
		width: 90%;
		padding: 10rpx;
		border: 1rpx solid #ddd;
		border-radius: 10rpx;
		margin-bottom: 10rpx;
	}

	/* 按钮区域 */
	.button-area {
		display: flex;
		width: 100%;
		height: 25px;
	}

	/* 深度思考按钮 */
	.deep-think-button {
		width: 70px;
		background-color: #34c759;
		color: white;
		border: none;
		border-radius: 10%;
		padding: 5rpx 10rpx;
		margin-right: 10rpx;
		text-align: center;
		line-height: 20px;
		font-size: 25rpx;
	}

	.deep-think-button.active {
		background-color: #ff9500;
	}

	/* 清空记录按钮 */
	.clear-button {
		width: 60px;
		background-color: #ff0000;
		color: white;
		border: none;
		border-radius: 10%;
		padding: 5rpx 10rpx;
		margin-right: 10rpx;
		text-align: center;
		line-height: 20px;
		font-size: 25rpx;
	}
</style>