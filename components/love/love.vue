<template>
	<view class="love" @click="changeSaveHeart($event)">
		<uni-icons :type="isSave ? 'heart-filled' : 'heart' " color="$ff6600" size="24"></uni-icons>
	</view>
</template>

<script setup>
	import {
		useIsLoggedIn
	} from '@/common/isLogin.js';
	import {
		useStore
	} from 'vuex';
	import {
		updateLike
	} from "@/ajax/api/interface/updateLike.js"
	import {
		computed,
		onMounted,
		ref
	} from 'vue';
	import Item from 'antd/es/list/Item';
	const {
		checkLogin
	} = useIsLoggedIn();
	let {
		itemId
	} = defineProps(['itemId']) //文章id
	const userInfo = ref()
	const store = useStore()
	onMounted(async () => {
		userInfo.value = await checkLogin();
	})
	const isSave = computed(() => {
		return userInfo.value && userInfo.value.article_likes_ids.includes(itemId)
	})

	async function changeSaveHeart(e) {
		e.stopPropagation();
		try {
			let user = await checkLogin();
			// 用户已登录，执行相关逻辑
			const {
				msg,
				newUserInfo
			} = await updateLike({
				articleId: itemId,
				userId: user._id
			})
			userInfo.value = newUserInfo
			store.commit('updateUserInfo', newUserInfo)
			uni.showToast({
				title: msg,
				icon: 'success'
			})
		} catch (error) {
			// 处理登录失败的情况，通常不需要在这里做额外处理，因为uni.navigateTo会处理导航
		}
	}
</script>

<style>

</style>