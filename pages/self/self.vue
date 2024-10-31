<template>
	<!-- 当用户为登录状态时进行显示 -->
	<view v-if="store.state.userInfo" class="my-header">
		<view class="my-header-background">
			<image :src="store.state.userInfo.avatar" mode="aspectFill"></image>
		</view>
		<view class="my-header-logo">
			<view class="my-header-logo-box" @click="changeAvatar">
				<image :src="store.state.userInfo.avatar" mode="aspectFill"></image>
			</view>
			<text class="user-name">{{store.state.userInfo.author_name}}</text>
		</view>
		<view class="my-header-info">
			<view class="my-header-info-box">
				<text class="my-header-info-title">被关注</text>
				<text>{{store.state.userInfo.follow_count}}</text>
			</view>
			<view class="my-header-info-box">
				<text class="my-header-info-title">粉丝</text>
				<text>{{store.state.userInfo.fans_count}}</text>
			</view>
			<view class="my-header-info-box">
				<text class="my-header-info-title">积分</text>
				<text>{{store.state.userInfo.integral_count||0}}</text>
			</view>
		</view>
	</view>

	<view class="my-content">
		<view v-if="!store.state.userInfo" class="my-content-list" @click="goLoginPage">
			<view class="my-content-list-title">
				<image class="company-logo" src="../../static/img/logo.jpeg" mode="aspectFill"></image>
				<text>HI，您尚未登录,请点击登录</text>
			</view>
			<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
		</view>
		<view class="my-content-list" @click="gotoMySelfArtic">
			<view class="my-content-list-title">
				<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
				<text>我的文章</text>
			</view>
			<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
		</view>
		<view class="my-content-list" @click="gotoFeedBack">
			<view class="my-content-list-title">
				<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
				<text>意见反馈</text>
			</view>
			<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
		</view>

		<!-- #ifdef APP-PLUS -->
		<view class="my-content-list" @click="haveNewVersion && get_new_version">
			<view class="my-content-list-title">
				<uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
				<view class="version-container">
					<text>
						当前版本
						<text v-if="haveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
					</text>
					<text class="version">{{currentVersion}}</text>
				</view>
			</view>
			<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
		</view>
		<!-- #endif -->
		<button v-if="store.state.userInfo" type="warn" class="sign-out" @click="siginOut">退出</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useStore
	} from "vuex"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		get_current_version
	} from "@/ajax/api/interface/get_current_version.js"
	import {
		AvatarUpdate
	} from "@/ajax/api/interface/AvatarUpdate.js"
	const currentVersion = ref('1.0.0')
	const haveNewVersion = ref(false)
	const store = useStore()
	onLoad(() => {
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: res => {
				if (res.platform === 'android') {
					plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
						currentVersion.value = wgtinfo
						checkVersion()
					})
				}
			}
		})
		// #endif
	})


	function goLoginPage() {
		uni.navigateTo({
			url: "/pages/userinfo/login/login"
		})
	}

	function siginOut() {
		store.commit('updateUserInfo', null)
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}

	function gotoMySelfArtic() {
		uni.navigateTo({
			url: "/pages/myArticle/myArticle"
		})
	}

	function gotoFeedBack() {
		uni.navigateTo({
			url: "/pages/feedback/feedback"
		})
	}

	async function checkVersion() {
		//检测当前版本
		const {
			version,
			downLoadLinkUrl
		} = await get_current_version();
		if (version > currentVersion.value) {
			haveNewVersion.value = true;
			downLoadLinkUrl.value = downLoadLinkUrl
		}
	}

	function get_new_version() {
		//自动下载新版本
		uni.showLoading({
			title: '下载中，请稍后'
		});
		var dtask = plus.downloader.createDownload(downLoadLinkUrl.value, {}, function(d, status) {
			// 下载完成  
			uni.hideLoading({})
			if (status == 200) {
				plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
					uni.showToast({
						title: '安装失败',
						duration: 1500,
						icon: 'none'
					});
				})
			} else {
				uni.showToast({
					title: '更新失败',
					duration: 1500,
					icon: 'none'
				});
			}
		});
		dtask.start();
	}

	function changeAvatar() {
		uni.chooseImage({
			count: 1,
			success: async res => {
				const filePath = await uploadFi(res.tempFiles[0].path, res.tempFiles[0].name)
				//注意，这里拿到的是文件存储的位置
				let list = await uniCloud.getTempFileURL({
					fileList: [filePath]
				});
				console.log(list.fileList[0].tempFileURL)
				await updateAvatar(list.fileList[0].tempFileURL)
			}
		})
	}
	async function uploadFi(filePath, cloudPath) {
		const folderName = 'avatar/'; // 确保以斜杠结束
		const fileName = cloudPath; // 或者你可以根据需要重新定义文件名

		// 创建完整的 cloudPath，包括文件夹名和文件名
		const fullCloudPath = folderName + fileName;
		const result = await uniCloud.uploadFile({
			filePath: filePath,
			cloudPath: fullCloudPath,
		})
		return result.fileID
	}

	async function updateAvatar(filePathId) {
		const res = await AvatarUpdate({
			userId: store.state.userInfo._id,
			filePath: filePathId
		})
		uni.showToast({
			title: '上传成功',
		})
		store.commit('updateUserInfo', {
			...store.state.userInfo,
			avatar: filePathId
		})
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-header {
		position: relative;
		padding-bottom: 30rpx;

		.my-header-background {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			opacity: .3;
			filter: blur(16rpx);

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-header-logo {
			@include flex(flex-start, column);
			align-items: center;
			padding-top: 60rpx;
			position: relative;
			z-index: 10;

			.my-header-logo-box {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.user-name {
				margin-top: 30rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.my-header-info {
			margin-top: 30rpx;
			@include flex();

			.my-header-info-box {
				width: 100%;
				@include flex(space-between, column);
				font-size: 24rpx;
				color: #999;

				.my-header-info-title {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}

	.my-content {
		.my-content-list {
			@include flex();
			padding: 30rpx;
			margin-bottom: 20rpx;
			background-color: #ffffff;
			color: #333;
			font-size: 28rpx;

			.my-content-list-title {
				display: flex;
				align-items: center;
				flex-grow: 1;

				.icons {
					margin-right: 10rpx;
				}

				/*版本样式 */
				.version-container {
					@include flex();
					flex-grow: 1;

					.version {
						margin-right: 40rpx;
						color: #888;
						font-weight: bold;
					}

					.new-version-tip {
						font-size: 20rpx;
						color: $base-color;
					}
				}
			}
		}

		.sign-out {
			margin: 120rpx 20rpx 0;
		}

		// 用户未登录状态
		.company-logo {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 40rpx;
		}
	}
</style>