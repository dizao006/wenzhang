<template>
	<view class="container">
		<iframe src="https://juejin.cn/user/935048196920576" frameborder="0" class="full-iframe"></iframe>
	</view>
</template>

<script setup>

</script>

<style>
	/* 确保容器撑满整个页面 */
	.container {
		width: 100vw;
		/* 视口宽度 */
		height: 100vh;
		/* 视口高度 */
		margin: 0;
		padding: 0;
		overflow: hidden;
		/* 隐藏滚动条 */
	}

	/* iframe撑满容器 */
	.full-iframe {
		width: 100%;
		height: 100%;
		border: none;
		/* 去掉边框 */
		margin: 0;
		padding: 0;
		display: block;
		/* 避免默认的 inline 元素间隙 */
	}
</style>