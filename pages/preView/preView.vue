<template>
	<view class="preview-container">
		<rich-text :nodes="htmlContent"></rich-text>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		useStore
	} from 'vuex';

	const store = useStore();
	const htmlContent = ref('');

	// 获取路由参数
	const route = useRoute();
	const articleId = route.query.id;

	// 加载文章内容
	onMounted(() => {
		const article = store.state.articList.find(item => item.id === articleId);
		if (article) {
			htmlContent.value = article.html;
		} else {
			uni.showToast({
				title: '文章未找到',
				icon: 'none'
			});
		}
	});
</script>

<style scoped>
	.preview-container {
		padding: 20px;
	}
</style>