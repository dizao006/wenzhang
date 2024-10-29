<template>
	<view class="container">
		<NavBar></NavBar>
		<TabBar :labeList='shoTbale.length>1 ?shoTbale:allList' :activeIndex='activeIndex' @changeIndex='changeIndex'>
		</TabBar>
		<ArticleList :artList='shoTbale.length>1 ?shoTbale:allList' :activeIndex='activeIndex' class="list-container"
			@changeIndex='changeIndex'>
		</ArticleList>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance,
		toRefs,
		watch,
		onUpdated
	} from 'vue';
	import {
		useStore
	} from "vuex"
	import {
		getLableList
	} from "../../ajax/api/interface/home.js"
	let activeIndex = ref(0)
	const store = useStore()
	const shoTbale = ref()

	function changeIndex(val) {
		activeIndex.value = val
	}
	const allList = ref()
	onMounted(async () => {
		allList.value = await getLableList()
		allList.value = [{
			name: '全部'
		}, ...allList.value]
		store.commit('setlabelList', allList.value)
	})

	watch(() => store.state.labelListItem, (n, v) => {
		shoTbale.value = [{
			name: '全部'
		}, ...n]
	}, {
		immediate: true,
		deep: true
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