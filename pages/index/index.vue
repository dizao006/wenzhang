<template>
	<view class="container">
		<NavBar></NavBar>
		<TabBar :labeList='arr' :activeIndex='activeIndex' @changeIndex='changeIndex'></TabBar>
		<ArticleList :artList='arr' :activeIndex='activeIndex' class="list-container" @changeIndex='changeIndex'>
		</ArticleList>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue';
	import {
		getLableList
	} from "../../ajax/api/interface/home.js"
	let arr = ref([])
	let activeIndex = ref(0)

	function changeIndex(val) {
		activeIndex.value = val
	}
	onMounted(async () => {
		const list = await getLableList()
		arr.value = [{
			name: '全部'
		}, ...list]
	})
</script>

<style scoped lang="scss">
	.container {
		@include flex(flex-start, column);
		color: $base-color;
		overflow: hidden;
		box-sizing: border-box;
		align-items: inherit;
	}

	page {
		display: flex;
		height: 100%;
	}

	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>