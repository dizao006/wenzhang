<template>
	<view class="list-scorll-container">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
			<view>
				<listCard @saveSearchHistory='props.saveSearchHistory' v-for="item in props.articleList" :key="item._id"
					:list="item">
				</listCard>
			</view>
			<uni-load-more v-if="isShow" :status="lo"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		inject,
		watch,
		computed
	} from 'vue';
	import {
		get_article_list
	} from "../../ajax/api/interface/home.js"

	let props = defineProps(['articleList', 'loadData', "isLoadMore", 'saveSearchHistory'])
	let emit = defineEmits(['loadMore'])
	let lo = ref('loading')
	let isShow = computed(() => {
		return props.isLoadMore === false ? props.isLoadMore : true
	})

	watch(() => props.loadData?.loading, (v, s) => {
		lo.value = v
	})

	function loadMore() {
		emit('loadMore')
	}
</script>

<style scoped lang="scss">
	.list-scorll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>