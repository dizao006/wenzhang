<template>
	<view>
		<uni-section title="显示右侧箭头" type="line">
			<uni-list class="listCn">
				<view @click="goXiangxi">
					<uni-list-item showArrow title="编辑资料" />
				</view>
				<view @click="goZhanghu"> <uni-list-item showArrow title="账号设置" /></view>
			</uni-list>
			<uni-list class="listCn">
				<view @click="goSun"> <uni-list-item title="深色模式" /></view>
				<view class="switch">
					<switch @change="changeSun" checked color="#FFCC33" style="transform:scale(0.9)" />
				</view>
				<view @click="goHuan"> <uni-list-item showArrow :title="queueSize" /></view>
			</uni-list>
			<uni-list class="listCn">
				<view> <uni-list-item rightText="V1.0.0" showArrow title="当前版本" /></view>
				<view @click="goAbout"> <uni-list-item showArrow title="关于" /></view>
			</uni-list>
		</uni-section>
		<view class="btn">
			<button @click="siginOut" style="color: red;font-size: 28rpx;">退出登录</button>
		</view>
	</view>
</template>
<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	import {
		useStore
	} from "vuex"

	const status = ref(true)
	const store = useStore()
	const queueSize = ref("缓存大小0MB")

	function siginOut() {
		store.commit('updateUserInfo', null)
		uni.switchTab({
			url: '/pages/index/index'
		})
	}

	function changeSun() {
		let body = document.querySelector("body")
		body.style.backgroundClor
	}

	function goXiangxi() {
		console.log("test")
		uni.navigateTo({
			url: "/pages/dataConfig/dataConfig"
		})
	}

	function goAbout() {
		uni.navigateTo({
			url: "/pages/Lianxi/Lianxi"
		})
	}

	function goZhanghu() {
		uni.navigateTo({
			url: "/pages/accountConfig/accountConfig"
		})
	}

	function goXiaoxi() {
		uni.navigateTo({
			url: "/pages/configxiaoxi/configxiaoxi"
		})
	}

	function goGuanli() {
		uni.navigateTo({
			url: "/pages/guanli/guanli"
		})
	}

	function goHuan() {
		console.log("sss")
		try {
			uni.clearStorageSync();
			uni.showToast({
				title: "缓存清除成功",
				icon: 'success'
			})
		} catch (err) {
			console.log('缓存同步清除失败：', err);
		}
	}
	onMounted(() => {
		uni.getStorageInfo({
			success: (res) => {
				// 将字节转换为MB并保留两位小数
				queueSize.value =
					`缓存大小                        ${(res.currentSize / (1024 * 1024)).toFixed(2)}MB`;
			}
		});
	})
</script>

<style lang="scss">
	.listCn {
		margin-top: 30rpx;
		font-size: 70rpx !important;
	}

	.btn {
		margin: 20rpx 40rpx;
	}

	.switch {
		margin-bottom: -80rpx;
		position: relative;
		left: 630rpx;
		top: -90rpx;
	}
</style>