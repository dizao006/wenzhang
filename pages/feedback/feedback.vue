<template>
	<view>
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>

		<view class="feedback-title">
			反馈图片：
		</view>

		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="removeImage(item)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 添加图片的icon -->
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="_addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>

		<button type="warn" class="feedback-button" @click="_submitFeedback">提交反馈意见</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useIsLoggedIn
	} from "@/common/isLogin.js"
	import {
		update_feedBack
	} from "@/ajax/api/interface/update_feedBack.js"
	import {
		useStore
	} from "vuex"
	const store = useStore()
	const content = ref()
	const imageList = ref([])
	const {
		checkLogin
	} = useIsLoggedIn()
	onLoad(async () => {
		await checkLogin()
	})

	async function _addImage() {
		const count = 5 - imageList.value.length
		uni.chooseImage({
			count,
			success(res) {
				const timpFilePath = res.tempFilePaths
				timpFilePath.forEach((item, index) => {
					if (index < count) {
						imageList.value.push({
							url: item,
							name: res.tempFiles[index].name
						})
					}
				})
			}
		})

	}
	async function _submitFeedback() {
		if (!content.value) {
			uni.showToast({
				title: '请输入反馈信息',
				icon: "error"
			})
			return
		}
		uni.showLoading()
		const feedBackImageList = await Promise.all(getFildId())
		uni.hideLoading()
		const res = await update_feedBack({
			content: content.value,
			userId: store.state.userInfo._id,
			feedBackImageList
		})
		uni.showToast({
			title: '反馈成功',
		})
		setTimeout(() => {
			uni.switchTab({
				url: "/pages/self/self"
			})
		}, 1000)
	}

	function getFildId() {
		//获取图片的上传地址
		console.log('imageList.value', imageList.value)
		return imageList.value.map((item) => {
			return new Promise(async (reslove) => {
				const result = await uniCloud.uploadFile({
					filePath: item.url,
					cloudPath: item.name
				})
				reslove(result.fileID)
			})
		})
	}


	function removeImage(item) {
		imageList.value = imageList.value.filter((e) => e.url !== item.url)
	}
</script>

<style scoped lang="scss">
	.feedback-title {
		margin: 30rpx;
		margin-bottom: 0;
		font-size: 28rpx;
		color: #666;
	}

	.feedback-content {
		margin: 30rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border: 1px solid #eee;

		.feedback-textarea {
			font-size: 24rpx;
			width: 100%;
			height: 200rpx;
		}
	}

	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;

		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				position: absolute;
				right: 0;
				top: 0;
				width: 44rpx;
				height: 44rpx;
				border-radius: 50%;
				z-index: 2;
				background-color: $base-color;
				@include flex(center);
			}

			.image-box {
				@include flex(center);
				top: 10rpx;
				right: 10rpx;
				position: absolute;
				left: 10rpx;
				bottom: 10rpx;
				border: 1px solid #eee;
				border-radius: 10rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-button {
		margin: 0 30rpx;
		background-color: $base-color;
	}
</style>