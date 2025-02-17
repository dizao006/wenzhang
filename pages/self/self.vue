<template>
	<view v-if="isLocked" class="lock-screen">
		<view style="display: flex; flex-direction: column;">
			<text>屏幕已锁定</text>
			<button style="margin-top: 20px;" @click="unlock">解锁</button>
		</view>

	</view>
	<view else>
		<view class="top">
			<view class="left">
				<uni-icons type="scan" size="25"></uni-icons>
			</view>
			<view class="right">
				<uni-icons class="icon" type="notification" size="25"></uni-icons>
				<uni-icons class="icon" type="gear" size="25" @click="goSetting"></uni-icons>
			</view>
		</view>
		<view v-if="store.state.userInfo" class="my-header">
			<view class="my-header-logo">
				<view class="my-header-logo-box" @click="changeAvatar">
					<image :src="store.state.userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text @click="changeName" class="user-name">{{
        store.state.userInfo.author_name
      }}</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text>{{ store.state.userInfo.follow_count }}</text>
					<text class="my-header-info-title">被关注</text>
				</view>
				<view class="my-header-info-box">
					<text>{{ store.state.userInfo.fans_count }}</text>
					<text class="my-header-info-title">粉丝</text>
				</view>
				<view class="my-header-info-box">
					<text>{{ store.state.userInfo.integral_count || 0 }}</text>
					<text class="my-header-info-title">积分</text>
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

			<view class="card">
				<view class="list-text" @click="goCalendar">
					<uni-icons size="35px" color="black" type="calendar"></uni-icons>
					<text>签到</text>
				</view>
				<view class="list-text" @click="goVip">
					<uni-icons size="35px" color="black" type="vip"></uni-icons>
					<text>VIP</text>
				</view>
				<view class="list-text" @click="goFalg">
					<uni-icons size="35px" color="black" type="flag"></uni-icons>
					<text>Falg</text>
				</view>
				<view class="list-text" @click="goAccount">
					<uni-icons size="35px" color="black" type="wallet"></uni-icons>
					<text>账户</text>
				</view>
			</view>

			<view class="createConter">
				<view class="toptitle">
					<text>创作者中心</text>
					<view class="shouye">
						<text>进入首页</text>
						<uni-icons type="arrow-right"></uni-icons>
					</view>
				</view>
				<view class="card">
					<view class="list-text" @click="goGift">
						<uni-icons size="35px" color="black" type="gift"></uni-icons>
						<text>礼物</text>
					</view>
					<view class="list-text" @click="goGame">
						<uni-icons size="35px" color="black" type="medal"></uni-icons>
						<text>竞赛</text>
					</view>
					<view class="list-text" @click="goUser">
						<uni-icons size="35px" color="black" type="person"></uni-icons>
						<text>个人</text>
					</view>
					<view class="list-text">
						<uni-icons size="35px" color="black" type="bars"></uni-icons>
						<text>草稿箱</text>
					</view>
				</view>
				<view class="textCent">
					<text> 欢迎各位创作者入驻缔造掘金</text>
				</view>
			</view>

			<view class="createConter">
				<view class="toptitle">
					<text>常用功能</text>
				</view>
				<view class="card">
					<view class="list-text" @click="gotoMySelfArtic">
						<uni-icons size="35px" color="black" type="eye"></uni-icons>
						<text>文章</text>
					</view>
					<view class="list-text">
						<uni-icons size="35px" color="black" type="fire"></uni-icons>
						<text>沸点</text>
					</view>
					<view class="list-text" @click="gotoFeedBack">
						<uni-icons size="35px" color="black" type="help"></uni-icons>
						<text>反馈</text>
					</view>
					<view class="list-text" @click="suoping">
						<uni-icons size="35px" color="black" type="locked"></uni-icons>
						<text>锁屏</text>
					</view>
				</view>
				<view class="card">
					<view class="list-text" @click="goTuiGuang">
						<uni-icons size="35px" color="black" type="map-pin-ellipse"></uni-icons>
						<text>推广</text>
					</view>
					<view class="list-text" @click="goLianxi">
						<uni-icons size="35px" color="black" type="phone"></uni-icons>
						<text>联系</text>
					</view>
					<view class="list-text" @click="goGame2">
						<uni-icons size="35px" color="black" type="undo"></uni-icons>
						<text>机战</text>
					</view>
					<view class="list-text" @click="goBk">
						<uni-icons size="35px" color="black" type="paperclip"></uni-icons>
						<text>博客</text>
					</view>
				</view>
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
						<text class="version">{{ currentVersion }}</text>
					</view>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<!-- #endif -->
			<!-- <button v-if="store.state.userInfo" type="warn" class="sign-out" @click="siginOut">退出</button> -->
		</view>
	</view>
	<!-- 当用户为登录状态时进行显示 -->

</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		useStore
	} from "vuex";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		get_current_version
	} from "@/ajax/api/interface/get_current_version.js";
	import {
		AvatarUpdate
	} from "@/ajax/api/interface/AvatarUpdate.js";
	const currentVersion = ref("1.0.0");
	const haveNewVersion = ref(false);
	const store = useStore();
	let isLocked = ref(false)


	onLoad(() => {
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: (res) => {
				if (res.platform === "android") {
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						currentVersion.value = wgtinfo.version;
						checkVersion();
					});
				}
			},
		});
		// #endif
	});

	function goLoginPage() {
		uni.navigateTo({
			url: "/pages/userinfo/login/login",
		});
	}

	function goSetting() {
		uni.navigateTo({
			url: "/pages/setting/setting",
		});
	}

	function goBk() {
		uni.navigateTo({
			url: "/pages/Boke/Boke",
		});
	}

	function goAccount() {
		uni.navigateTo({
			url: "/pages/AccountUser/AccountUser",
		});
	}

	function goCalendar() {
		uni.navigateTo({
			url: "/pages/Calendar/Calendar",
		});
	}

	function unlock() {
		isLocked.value = false
	}

	function suoping() {
		isLocked.value = true
	}

	function goVip() {
		uni.navigateTo({
			url: "/pages/VipBuy/VipBuy",
		});
	}

	function goUser() {
		uni.navigateTo({
			url: "/pages/InfoUser/InfoUser",
		});
	}

	function goGift() {
		uni.navigateTo({
			url: "/pages/gift/gift",
		});
	}

	function goGame() {
		uni.navigateTo({
			url: "/pages/game/game",
		});
	}

	function goFalg() {
		uni.navigateTo({
			url: "/pages/Flag/Flag",
		});
	}

	function goGame2() {
		uni.navigateTo({
			url: "/pages/game2/game2",
		});
	}

	function goLianxi() {
		uni.navigateTo({
			url: "/pages/Lianxi/Lianxi",
		});
	}

	function goTuiGuang() {
		uni.navigateTo({
			url: "/pages/TuiGuang/TuiGuang",
		});
	}

	function siginOut() {
		store.commit("updateUserInfo", null);
		uni.navigateTo({
			url: "/pages/index/index",
		});
	}

	function gotoMySelfArtic() {
		uni.navigateTo({
			url: "/pages/myArticle/myArticle",
		});
	}

	function gotoFeedBack() {
		uni.navigateTo({
			url: "/pages/feedback/feedback",
		});
	}

	async function checkVersion() {
		//检测当前版本
		const {
			version,
			downLoadLinkUrl
		} = await get_current_version();
		if (version > currentVersion.value) {
			haveNewVersion.value = true;
			downLoadLinkUrl.value = downLoadLinkUrl;
		}
	}

	function get_new_version() {
		//自动下载新版本
		uni.showLoading({
			title: "下载中，请稍后",
		});
		var dtask = plus.downloader.createDownload(
			downLoadLinkUrl.value, {},
			function(d, status) {
				// 下载完成
				uni.hideLoading({});
				if (status == 200) {
					plus.runtime.install(
						plus.io.convertLocalFileSystemURL(d.filename), {}, {},
						function(error) {
							uni.showToast({
								title: "安装失败",
								duration: 1500,
								icon: "none",
							});
						}
					);
				} else {
					uni.showToast({
						title: "更新失败",
						duration: 1500,
						icon: "none",
					});
				}
			}
		);
		dtask.start();
	}

	function changeAvatar() {
		uni.chooseImage({
			count: 1,
			success: async (res) => {
				const filePath = await uploadFi(
					res.tempFiles[0].path,
					res.tempFiles[0].name
				);
				//注意，这里拿到的是文件存储的位置
				let list = await uniCloud.getTempFileURL({
					fileList: [filePath],
				});
				await updateAvatar(list.fileList[0].tempFileURL);
			},
		});
	}
	async function uploadFi(filePath, cloudPath) {
		const folderName = "avatar/"; // 确保以斜杠结束
		const fileName = cloudPath; // 或者你可以根据需要重新定义文件名

		// 创建完整的 cloudPath，包括文件夹名和文件名
		const fullCloudPath = folderName + fileName;
		const result = await uniCloud.uploadFile({
			filePath: filePath,
			cloudPath: fullCloudPath,
		});
		return result.fileID;
	}

	async function updateAvatar(filePathId) {
		const res = await AvatarUpdate({
			userId: store.state.userInfo._id,
			filePath: filePathId,
		});
		uni.showToast({
			title: "上传成功",
		});
		store.commit("updateUserInfo", {
			...store.state.userInfo,
			avatar: filePathId,
		});
	}
</script>

<style scoped lang="scss">
	page {
		background: linear-gradient(to bottom, #f9f9f9, #f8f8f8);
	}

	.my-header {
		position: relative;
		padding-bottom: 5rpx;
		transform: translate(0, -30rpx);

		.my-header-background {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			opacity: 0.3;
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

	.top {
		// background: ;
		display: flex;
		justify-content: space-between;

		.left {
			margin-left: 10rpx;
		}

		.right {
			// transform: translate(-20rpx);
			margin-right: 16rpx;

			.icon {
				margin-left: 9rpx;
			}
		}
	}

	.card {
		display: flex;
		justify-content: space-around;
		background: #f5f5f4;
		border-radius: 5px;
		margin: 5rpx 25rpx 20rpx 25rpx;

		.list-text {
			// padding: 10rpx;
			margin: 20rpx 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.createConter {
		background: #f3f3f2;
		margin: 4rpx;
		border-radius: 5px;
		margin: 5rpx 30rpx 20rpx 30rpx;

		.toptitle {
			display: flex;
			justify-content: space-between;
			// margin-left: 18rpx;
			margin: 25rpx 5rpx 20rpx 20rpx;
			padding-top: 15rpx;

			.shouye {
				margin-right: 18rpx;
				color: rgba(0, 0, 0, 0.4);
				font-size: 22rpx;
			}
		}

		.textCent {
			display: flex;
			justify-content: center;
			padding: 8rpx;
			color: rgba(0, 0, 0, 0.5);
		}
	}

	.lock-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 24px;
		z-index: 9999;
	}
</style>