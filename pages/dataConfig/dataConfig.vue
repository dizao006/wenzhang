<template>
	<view class="body">
		<set-userinfo :userInfo="store.state.userInfo" @updateStore="updateStore"></set-userinfo>
	</view>
</template>

<script setup>
	import setUserinfo from "../../components/set-userinfo/set-userinfo.vue";
	import {
		useStore
	} from "vuex";
	const store = useStore();

	function updateStore(userInfo) {
		store.commit('updateUserInfo', userInfo)
		uni.switchTab({
			url: "/pages/self/self"
		})
	}
</script>

<style lang="scss" scoped></style>