<template>
	<swiper class="swiper-container" :current="prop.activeIndex" @change="changeAct">
		<swiper-item class="swiper-item" v-for="item in prop.artList" :key="item._id">
			<ListItem :loadData="loadData[prop.activeIndex]" @loadMore="loadMore"
				:articleList='articleData[prop.activeIndex]'>
			</ListItem>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		provide,
		reactive,
		ref,
		watch
	} from 'vue';
	import {
		get_article_list
	} from "../../ajax/api/interface/home.js"
	let prop = defineProps(['artList', 'activeIndex'])
	let emit = defineEmits(['changeIndex'])
	let articleData = ref({})
	let loadData = ref({})
	let indx = ref()
	let page = ref(1)
	let pageSize = ref(6)

	function changeAct(e) {
		const index = e.detail.current
		emit('changeIndex', index)
	}
	watch([() => prop.artList, () => prop.activeIndex, ], (n) => {
		indx.value = n[0][n[1]]
		getArtList(indx.value)
	})

	async function getArtList(num) {
		//每一个分类里面的页数信息
		if (!loadData.value[prop.activeIndex]) {
			loadData.value[prop.activeIndex] = {
				page: 1,
				loading: 'loading,',
				total: 0
			}
		}
		let {
			articleList,
			total
		} = await get_article_list({
			classify: num.name,
			page: loadData.value[prop.activeIndex].page,
			pageSize: pageSize.value,
		})
		//做一个缓存
		let oldList = articleData.value[prop.activeIndex] || []
		oldList.push(...articleList)
		articleData.value[prop.activeIndex] = oldList
		loadData.value[prop.activeIndex].total = total
	}

	function loadMore() {
		// 加载更多内容
		if (loadData.value[prop.activeIndex].total === articleData.value[prop.activeIndex].length) {
			loadData.value[prop.activeIndex] = {
				...loadData.value[prop.activeIndex],
				...{
					loading: 'noMore'
				}
			}
			console.log("@@@ASD", loadData.value[prop.activeIndex]);
			nextTick()
			return
		}
		loadData.value[prop.activeIndex].page++
		getArtList(indx.value)
	}
</script>

<style lang="scss" scoped>
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>