<template>
	<!-- 弹窗遮罩层 -->
	<view class="ai-popup-mask" v-if="visible" @click="closePopup">
		<!-- 弹窗内容 -->
		<view class="ai-popup-content" @click.stop>
			<!-- 关闭按钮 -->
			<view class="ai-popup-close" @click="closePopup">
				<uni-icons type="closeempty" size="24" color="#999"></uni-icons>
			</view>
			<!-- AI 页面 -->
			<ai2Vue></ai2Vue>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	// import AiVue from '../../pages/Ai/Ai.vue';
	import ai2Vue from '../../pages/ai2/ai2.vue';

	// 控制弹窗显示/隐藏
	const visible = ref(false);

	// 打开弹窗
	const openPopup = () => {
		visible.value = true;
	};

	// 关闭弹窗
	const closePopup = () => {
		visible.value = false;
	};

	// 暴露方法给父组件
	defineExpose({
		openPopup,
		closePopup,
	});
</script>

<style scoped>
	/* 弹窗遮罩层 */
	.ai-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	/* 弹窗内容 */
	.ai-popup-content {
		width: 90%;
		height: 80vh;
		background-color: white;
		border-radius: 20rpx;
		padding: 20rpx;
		position: relative;
	}

	/* 关闭按钮 */
	.ai-popup-close {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 1000;
	}
</style>