<template>
	<view class="tabBar">
		<scroll-view scroll-x="true" class="tabScroll" :scroll-with-animation="true" :scroll-into-view="currentIndex">
			<view class='box'>
				<view @click="changeActive(index)" :class="{active:activeIndex==index}" :key="item.id" class='tab-item'
					:id="`item${index}`" v-for="(item,index) in labeList">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标 -->
		<view class="icons">
			<uni-icons type='gear' size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from "vue"
	let prop = defineProps(['activeIndex', 'labeList'])
	let emit = defineEmits(['changeIndex'])
	let currentIndex = ref(`item0`)

	function changeActive(index) {
		emit('changeIndex', index)
	}
	watch(() => prop.activeIndex, (val) => {
		currentIndex.value = `item${val}`
	})
</script>

<style lang="scss" scoped>
	@import "./css/TabBar.scss"
</style>