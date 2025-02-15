<template>
	<view class="navBar">
		<view class="nav-bar-top">
			<view :style="{height:statusHeight + 'rpx' }">
				<!-- 处理app的默认导航栏的高度 -->
				<!-- 组件作为搜索界面展示回退按钮 -->
				<view @click="returnAfterView" class="return-icon" :style="{top:statusHeight+'rpx'}" v-if="isSearch">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view @click="toSerch" class="nav-bar-back"
				:style="{marginRight:marg+'rpx',marginLeft:isSearch ? '20rpx':''}">
				<uni-icons type="search" color="$999" size="30"></uni-icons>
				<view class="nav-bar-text" v-if="!isSearch">
					输入文章标题进行搜索
				</view>
				<input type="text" v-model="valueSerch" v-else class="serch-input" placeholder="输入文章标题进行搜索"
					confirm-type="search" @confirm="changeInput" />
			</view>
		</view>
		<!-- 底部垫片 -->
		<view :style="{height:statusHeight+80+'rpx'}">

		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		watch,
		toRefs,
	} from 'vue';
	const props = defineProps(['isSearch', 'serchValue']);
	const {
		isSearch,
		serchValue
	} = toRefs(props);
	let emit = defineEmits(['updateValue', 'sendSearchData'])
	let statusHeight = ref(20)
	let marg = ref(0)

	function changeInput() {
		//通知父组件
		emit('sendSearchData', valueSerch)
	}
	const valueSerch = computed({
		get() {
			return serchValue.value;
		},
		set(val) {
			emit('updateValue', val);
			if (!val) {
				emit('sendSearchData', val);
			}
		}
	});

	function returnAfterView() {

		uni.switchTab({
			url: "../../pages/index/index"
		})

		// uni.navigateBack() //如果刷新的话会没有历史记录栈
	}

	function getSystemInfo() {
		uni.getSystemInfo().then((e) => {
			e.statusBarHeight != 0 ? statusHeight.value = e.statusBarHeight * 2 : statusHeight.value = 20
			// #ifdef MP-WEIXIN
			const menuBtn = uni.getMenuButtonBoundingClientRect()
			statusHeight.value = menuBtn.top * 2
			marg.value = menuBtn.width * 2
			// #endif
		})
	}
	getSystemInfo()

	function toSerch() {
		if (!isSearch.value) {
			uni.navigateTo({
				url: "/pages/serch/serch"
			})
		}
	}
</script>

<style lang="scss">
	@import './css/navbar.scss'
</style>