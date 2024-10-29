<template>
	<uni-popup ref="popup" :mask-click="false" type="bottom">
		<!-- 内容区域 -->
		<view class="poput-wrapper">
			<view class="header">
				<view class="popItem" @click="closeFA">
					取消
				</view>
				<view class="popItem" @click="sendComentData">
					发布
				</view>
			</view>
			<view class="popContent">
				<textarea class="popup-content-textarea" v-model.trim="commentValue" placeholder="请输入内容"
					maxlength="200"></textarea>
				<view class="popup-content-count">
					{{200 - (commentValue?.length ? commentValue?.length : 0)}}
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	const popup = ref()
	const props = defineProps(['isshow'])
	const emit = defineEmits(['closeShow', 'sendDataComent'])
	const commentValue = ref()
	watch(() => props.isshow, (n) => {
		if (n) {
			popup.value.open()
		} else {
			popup.value.close()

		}
	})

	function closeFA() {
		emit('closeShow')
	}

	async function sendComentData() {
		if (commentValue.value == '') return
		emit('sendDataComent', commentValue.value)
		commentValue.value = ''
	}
</script>

<style lang="scss" scoped>
	.poput-wrapper {
		background-color: #fff;

		.header {
			@include flex();
			font-size: 28rpx;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;

			.popItem {
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 30rpx;
			}
		}

		.popContent {
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;

			.popup-content-textarea {
				height: 400rpx;
				width: 100%;
			}

			.popup-content-count {
				@include flex(flex-end);
				font-size: 24rpx;
				color: #6c6c6c;
			}
		}
	}
</style>