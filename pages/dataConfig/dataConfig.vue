<template>
	<view class="body">
		<set-userinfo :userInfo="store.state.userInfo"></set-userinfo>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import setUserinfo from "../../components/set-userinfo/set-userinfo.vue"
	import {
		useStore
	} from "vuex"
	const store = useStore();
</script>

<style lang="scss" scoped>

</style>