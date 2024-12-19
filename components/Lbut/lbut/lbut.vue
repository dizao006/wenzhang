<template>
	<view class="page-main">
		<liu-super-slide :swiperList="swiperList" :bgUrl="bgUrl" :autoplay="autoplay"
			:interval="interval"></liu-super-slide>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoplay: true,
				interval: 2000,
				// bgUrl: "https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401_1280.png",
				swiperList: [{
					picUrl: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c8320957b2d4fa6a8259ddcf67407b0~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis',
				}, {
					picUrl: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9107fd4e431466d9281a78598491864~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis',
				}, {
					picUrl: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ac6ff1aab644df78deb033716480ce8~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis',
				}, {
					picUrl: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b09bb1368a4eefb9fcf4bdde04bbd4~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis',
				}, {
					picUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fef7e84d094845738b958d6f6d64e906~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis',
				}]
			}
		},
		methods: {}
	}
</script>