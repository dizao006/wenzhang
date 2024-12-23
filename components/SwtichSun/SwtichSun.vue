<template>
	<view>
		<v-switch v-model="status" size="1.2" :activeValue="1" :inactive-value="0" @change="toggleMode"></v-switch>
	</view>
</template>

<script>
	import vSwitch from '@/components/v-switch/v-switch'
	export default {
		name: "SwtichSun",
		components: {
			vSwitch
		}
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>