<template>
	<view>
		<listCard :list='list' v-for="list in articleList" :key="list._id"></listCard>
		<view v-if="isNoData" class="no-data">暂无发布的文章</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import listCard from "@/components/listCard/listCard.vue"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useIsLoggedIn
	} from "@/common/isLogin.js"
	import {
		useStore
	} from "vuex"
	import {
		getArticleMyList
	} from "@/ajax/api/interface/getArticleMyList.js"
	const {
		checkLogin
	} = useIsLoggedIn()

	const store = useStore()
	const articleList = ref({})
	const isNoData = ref(false)
	onLoad(async () => {
		await checkLogin()
		await getMyArticleList()
	})

	async function getMyArticleList() {
		const list = await getArticleMyList({
			userId: store.state.userInfo._id
		})
		articleList.value = list
		if (list.length > 0) {
			isNoData.value = true
		}
	}
</script>

<style scoped lang="scss">
	.no-data {
		height: 400rpx;
		line-height: 400rpx;
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #666;
	}
</style>