<template>
	<view>
		<!-- 基础卡片 -->
		<view v-if="props.list.mode === 'base'" class="list-card" @click="goArticleDetail">
			<view class="list-card-img">
				<image :src="
            props.list.cover[0] ? props.list.cover[0] : '/static/img/logo.jpeg'
          " mode="aspectFill">
				</image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{ props.list.title }}</text>
					<love :itemId="props.list._id"></love>
				</view>
				<view class="list-card-content-desc">
					<view class="article-type">
						{{ props.list.classify }}
					</view>
					<view class="count"> 浏览量：{{ props.list.browse_count }} </view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view v-if="props.list.mode === 'column'" @click="goArticleDetail" class="list-card model-column">
			<view class="list-card-top">
				<text>{{ props.list.title }}</text>
				<love :itemId="props.list._id"></love>
			</view>
			<view class="list-card-middle">
				<view class="image-container" v-for="(item, index) in props.list.cover.slice(0, 3)" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{ props.list.classify }}
				</view>
				<view class="count"> 浏览量：{{ props.list.browse_count }} </view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view v-if="props.list.mode === 'image'" @click="goArticleDetail" class="list-card model-image">
			<view class="list-card-top">
				<view class="image-container">
					<image :src="props.list.cover[0]" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-middle">
				<text>{{ props.list.title }}</text>
				<love :itemId="props.list._id"></love>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{ props.list.classify }}
				</view>
				<view class="count"> 浏览量：{{ props.list.browse_count }} </view>
			</view>
		</view>
	</view>
</template>

<script setup>
	let props = defineProps(["list"]);
	const emit = defineEmits(["saveSearchHistory"]);
	async function goArticleDetail() {
		//进入详情页面
		const {
			_id,
			title,
			author,
			create_time,
			thumbs_up_count,
			browse_count
		} =
		props.list;
		const parms = {
			_id,
			title,
			author,
			create_time,
			thumbs_up_count,
			browse_count,
		};
		emit("saveSearchHistory");
		uni.navigateTo({
			url: `/pages/articleDetail/articleDetail?options=${JSON.stringify(parms)}`,
		});

	}
</script>

<style lang="scss">
	@import "./css/ListCard.scss";
</style>