<template>
	<view class="container">
		<view class="header">
			<view class="user-info">
				<image class="avatar"
					src="https://ai-public.mastergo.com/ai/img_res/8e9aef7b007ccf2f3972e662914b4f0c.jpg"
					mode="aspectFill" />
				<view class="info">
					<text class="name">智能助手</text>
					<view class="status">
						<view class="status-dot"></view>
						<text class="status-text">在线</text>
					</view>
				</view>
			</view>
			<view class="actions">
				<view class="action-btn" @click="clearHistory">
					<uni-icons type="trash" size="24" color="#6B7280" />
				</view>
			</view>
		</view>

		<scroll-view class="chat-container" scroll-y :scroll-into-view="'message-' + (chatList.length - 1)"
			scroll-with-animation :scroll-top="scrollTop" @scroll="handleScroll">
			<view class="message-list">
				<view v-for="(item, index) in chatList" :key="index" :id="'message-' + index" class="message"
					:class="item.role === 'user' ? 'user-message' : 'ai-message'">
					<view class="bubble">
						<view class="text">
							<zero-markdown-view :markdown="item.content"></zero-markdown-view>
						</view>
						<view v-if="item.role === 'ai' && item.loading" class="thinking">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
						<view v-if="item.role === 'ai' && !item.loading" class="copy-btn"
							@click="copyText(item.content)">
							<uni-icons type="copy" size="18" color="#6B7280" />
							<text class="copy-text">复制</text>
						</view>
						<view v-if="item.role === 'ai' && !item.loading">
							<view v-if="!item.isSpeaking" class="voice-btn" @click="startSpeak(item)">
								<uni-icons type="sound" size="18" color="#6B7280" />
								<text class="copy-text">朗读</text>
							</view>
							<!-- 暂停按钮 - 正在朗读时显示 -->
							<view v-if="item.isSpeaking" class="voice-btn" @click="pauseSpeak(item)">
								<uni-icons type="pause" size="18" color="#2B7FFF" />
								<text class="copy-text">暂停</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="input-area">
			<view class="input-container">
				<view class="voice-btn" @touchstart="startSpeechRecognition" @touchend="stopSpeechRecognition"
					:class="{ 'recording': isRecording }">
					<uni-icons :type="isRecording ? 'mic-filled' : 'mic'" size="24"
						:color="isRecording ? '#FF0000' : '#6B7280'" />
				</view>
				<input class="input" type="text" v-model="inputText" placeholder="问我任何问题..." @confirm="sendMessage" />
				<view class="deep-think-btn" @click="toggleDeepThinking">
					<uni-icons type="paperclip" size="24" :color="isDeepThinking ? '#2B7FFF' : '#6B7280'" />
				</view>
				<view class="send-btn" @click="sendMessage">
					<uni-icons type="paperplane" size="24" color="#2B7FFF" />
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, nextTick } from 'vue';
	import { main, clearHistory as clearApiHistory, setBackground } from '@/common/ai.js';
	import getAarticleDetatil from "../../ajax/api/interface/getAarticleDetatil";
	const parm = defineProps(["articleId"]);

	// 聊天记录
	const chatList = ref<Array<{
		role : string,
		content : string,
		loading ?: boolean,
		isSpeaking ?: boolean
	}>>([]);
	const inputText = ref('');
	const isDeepThinking = ref(false);
	const artic = ref();
	const scrollTop = ref(0);
	const oldScrollTop = ref(0);
	const speechSynthesis = ref({
		instance: null as SpeechSynthesisUtterance | null,
		currentIndex: -1 // 当前正在朗读的消息索引
	});
	const isFinally = ref(false)

	// 语音识别对象
	const recognition = ref(new (window.SpeechRecognition || window.webkitSpeechRecognition)());
	recognition.value.continuous = true;
	recognition.value.interimResults = true;

	const isRecording = ref(false);

	// 加载历史记录
	const loadChatHistory = () => {
		const history = uni.getStorageSync('chatHistory');
		chatList.value = history || [{
			role: 'ai',
			content: '你好！我是你的智能助手。我可以帮你处理各种任务，比如写作、翻译、回答问题等。请问有什么我可以帮你的吗？ 😊',
		}];
	};

	const saveChatHistory = () => {
		uni.setStorageSync('chatHistory', chatList.value);
	};

	onMounted(async () => {
		loadChatHistory();

		if (parm.articleId) {
			artic.value = await getAarticleDetatil({ articleId: parm.articleId });
			if (artic.value?.content) {
				setBackground(artic.value.content);
			}
		}
	});

	const handleScroll = (e : any) => {
		oldScrollTop.value = e.detail.scrollTop;
	};

	const sendMessage = async () => {
		isFinally.value = false
		if (!inputText.value.trim()) {
			uni.showToast({ title: '请输入内容', icon: 'none' });
			return;
		}

		const userMessage = inputText.value;
		inputText.value = '';

		chatList.value.push(
			{ role: 'user', content: userMessage },
			{ role: 'ai', content: '', loading: true, isSpeaking: false }
		);

		await nextTick();
		scrollToBottom();

		try {
			await main(userMessage, (chunk) => {
				const lastMessage = chatList.value[chatList.value.length - 1];
				lastMessage.content += chunk;
				nextTick();
				if (Math.abs(scrollTop.value - oldScrollTop.value) < 10) {
					scrollToBottom();
				}
			}, isDeepThinking.value);
			isFinally.value = true
		} catch (error) {
			console.error('请求出错:', error);
			uni.showToast({ title: '请求失败，请重试', icon: 'none' });
			chatList.value[chatList.value.length - 1].content = '请求失败，请重试';
		} finally {
			const lastMessage = chatList.value[chatList.value.length - 1];
			lastMessage.loading = false;
			saveChatHistory();
		}
	};

	const scrollToBottom = () => {
		nextTick(() => {
			setTimeout(() => {
				scrollTop.value = oldScrollTop.value + 1;
			}, 50);
		});
	};

	const toggleDeepThinking = () => {
		isDeepThinking.value = !isDeepThinking.value;
		uni.showToast({
			title: isDeepThinking.value ? '已开启深度思考' : '已关闭深度思考',
			icon: 'none'
		});
	};

	const clearHistory = () => {
		clearApiHistory();
		chatList.value = [{
			role: 'ai',
			content: '你好！我是你的智能助手。我可以帮你处理各种任务，比如写作、翻译、回答问题等。请问有什么我可以帮你的吗？ 😊',
		}];
		uni.removeStorageSync('chatHistory');
	};
	const copyText = (text : string) => {
		uni.setClipboardData({
			data: text,
			success: () => {
				uni.showToast({
					title: '已复制到剪贴板',
					icon: 'none'
				});
			},
			fail: (err) => {
				console.error('复制失败:', err);
				uni.showToast({
					title: '复制失败',
					icon: 'none'
				});
			}
		});
	};

	const voiceRecognizer = ref(null);

	const startSpeechRecognition = async () => {
		if (isRecording.value) return;

		try {
			// H5环境需要用户交互后才能调用录音API
			isRecording.value = true;
			recognition.value.start();
		} catch (error) {
			isRecording.value = false;
			uni.showToast({
				title: '录音失败: ' + (error.message || error),
				icon: 'none'
			});
		}
	};

	const stopSpeechRecognition = () => {
		if (!isRecording.value) return;
		isRecording.value = false;
		recognition.value.stop();
	};

	const startSpeak = (item : any, index : number) => {
		// 停止当前正在朗读的内容
		if (speechSynthesis.value.instance) {
			window.speechSynthesis.cancel();
		}

		// 创建新的语音实例
		const utterance = new SpeechSynthesisUtterance(item.content);
		utterance.lang = 'zh-CN';
		utterance.rate = 2.0;

		// 更新状态
		item.isSpeaking = true;
		speechSynthesis.value.instance = utterance;
		speechSynthesis.value.currentIndex = chatList.value.indexOf(item);

		// 设置事件监听
		utterance.onend = () => {
			item.isSpeaking = false;
			speechSynthesis.value.instance = null;
			speechSynthesis.value.currentIndex = -1;
		};
		// 开始朗读
		window.speechSynthesis.speak(utterance);
	};

	// 暂停朗读
	const pauseSpeak = (item : any) => {
		if (speechSynthesis.value.instance) {
			window.speechSynthesis.cancel();
			item.isSpeaking = false;
			speechSynthesis.value.instance = null;
			speechSynthesis.value.currentIndex = -1;
		}
	};
</script>

<style>
	page {
		height: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #FFFFFF;
	}

	.header {
		padding: 20rpx 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 44rpx;
	}

	.info {
		margin-left: 24rpx;
	}

	.name {
		font-size: 16px;
		font-weight: 600;
		color: #333;
	}

	.status {
		display: flex;
		align-items: center;
	}

	.status-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: #22C55E;
		margin-right: 8rpx;
	}

	.status-text {
		font-size: 12px;
		color: #6B7280;
	}

	.actions {
		display: flex;
		gap: 32rpx;
	}

	.action-btn {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chat-container {
		flex: 1;
		padding: 32rpx;
		overflow: auto;
		box-sizing: border-box;
	}

	.message-list {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		padding-bottom: 20rpx;
		/* 增加底部内边距 */
	}

	.message {
		display: flex;
	}

	.bubble {
		max-width: 70%;
		/* 调整最大宽度，防止太宽 */
		padding: 24rpx;
		border-radius: 24rpx;
		word-break: break-word;
		/* 长文本自动换行 */
	}

	.ai-message .bubble {
		background-color: #F7F7F7;
		margin-right: auto;
	}

	.user-message {
		justify-content: flex-end;
	}

	.user-message .bubble {
		background-color: #2B7FFF;
		margin-left: auto;
	}

	.text {
		font-size: 14px;
		line-height: 1.5;
	}

	.user-message .text {
		color: #FFFFFF;
	}

	.thinking {
		display: flex;
		gap: 8rpx;
		margin-top: 16rpx;
	}

	.dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: #9CA3AF;
		animation: thinking 1.4s infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes thinking {

		0%,
		80%,
		100% {
			opacity: 0.2;
		}

		40% {
			opacity: 1;
		}
	}

	.input-area {
		padding: 24rpx 32rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
	}

	.input-container {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}

	.voice-btn,
	.deep-think-btn,
	.send-btn {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.input {
		flex: 1;
		height: 80rpx;
		background-color: #F3F4F6;
		border-radius: 16rpx;
		padding: 0 32rpx;
		font-size: 14px;
		box-sizing: border-box;
	}

	.voice-btn.recording {
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
		}

		100% {
			transform: scale(1);
		}
	}

	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 12rpx;
		padding-top: 8rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	.copy-btn:active {
		opacity: 1;
	}

	.copy-text {
		font-size: 12px;
		color: #6B7280;
		margin-left: 8rpx;
	}

	/* 调整AI消息气泡样式，为复制按钮留出空间 */
	.ai-message .bubble {
		background-color: #F7F7F7;
		margin-right: auto;
		padding-bottom: 16rpx;
		/* 增加底部内边距 */
	}

	.action-buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 12rpx;
		padding-top: 8rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	.copy-btn,
	.voice-btn {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		opacity: 0.6;
		transition: opacity 0.2s;
	}

	.copy-btn:active,
	.voice-btn:active {
		opacity: 1;
	}

	.copy-text {
		font-size: 12px;
		color: #6B7280;
		margin-left: 8rpx;
	}

	.action-buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 12rpx;
		padding-top: 8rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	.copy-btn,
	.voice-btn {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		opacity: 0.6;
		transition: all 0.2s;
	}

	.copy-btn:active,
	.voice-btn:active {
		opacity: 1;
		transform: scale(0.95);
	}

	.copy-text {
		font-size: 12px;
		color: #6B7280;
		margin-left: 8rpx;
	}

	/* 朗读按钮激活状态 */
	.voice-btn.active {
		opacity: 1;
		color: #2B7FFF;
	}
</style>