<template>
	<view>
		<uni-section title="显示右侧箭头" type="line">
			<uni-list class="listCn">
				<view @click="goXiangxi">
					<uni-list-item showArrow title="编辑资料" />
				</view>
				<view @click="goZhanghu"> <uni-list-item showArrow title="账号设置" /></view>
				<view @click="goXiaoxi"> <uni-list-item showArrow title="消息设置" /></view>
			</uni-list>
			<uni-list class="listCn">
				<view @click="goGuanli"> <uni-list-item showArrow title="屏蔽管理" /></view>
				<view @click="goGexi"> <uni-list-item showArrow title="个性化推荐" /></view>
				<view @click="goSun"> <uni-list-item title="深色模式" /></view>
				<view class="switch">
					<switch @change="changeSun" checked color="#FFCC33" style="transform:scale(0.9)" />
				</view>
				<view> <uni-list-item showArrow title="缓存处理" @click="goHuan" /></view>
			</uni-list>
			<uni-list class="listCn">
				<view> <uni-list-item rightText="V1.0.0" showArrow title="当前版本" /></view>
				<view> <uni-list-item showArrow title="关于" /></view>
			</uni-list>
		</uni-section>
		<view class="btn">
			<button @click="siginOut" style="color: red;font-size: 28rpx;">退出登录</button>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from "vue";
	import {
		useStore
	} from "vuex"

	const status = ref(true)
	const store = useStore()

	function siginOut() {
		store.commit('updateUserInfo', null)
		uni.switchTab({
			url: '/pages/index/index'
		})
	}

	function changeSun() {
		console.log("测试黑暗模式")
	}

	function goXiangxi() {
		console.log("test")
		uni.navigateTo({
			url: "/pages/dataConfig/dataConfig"
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
		// 清除缓存
	}
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