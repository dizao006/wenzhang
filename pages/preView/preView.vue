<template>
	<view>
		<uv-parse :content="html" :selectable="true" lazyLoad="true"></uv-parse>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useStore
	} from "vuex"
	import {
		ref
	} from "vue"
	const store = useStore()
	const id = ref(''); // 定义响应式变量来存储接收到的参数
	const html = ref('')
	onLoad((options) => {
		id.value = options.id
		html.value = store.state.articList[id.value].html
	})
</script>