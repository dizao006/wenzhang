<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:currentIndex===0}" @click='currentIndex=0'>文章</view>
				<view class="follow-tab-item" :class="{active:currentIndex===1}" @click='currentIndex=1'>作者</view>
			</view>
		</view>
		<!-- 内容切换区域 -->
		<view class="follow-list-container">
			<swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex=$event.detail.current">
				<swiper-item>
					<ListItem :isLoadMore="isLoadMore" :articleList="articleList" v-if="articleList.length">
					</ListItem>
					<view v-if="dataNone" class="no-data">暂无收藏的文章</view>
				</swiper-item>
				<swiper-item>
					<AuthorList :authorList="authorList"></AuthorList>
					<view v-if="authorDataNone" class="no-data">暂无收藏的文章</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	}
	from "@dcloudio/uni-app"
	import {
		useIsLoggedIn
	} from "@/common/isLogin.js"
	import {
		useStore
	} from "vuex"
	import {
		getArticFloow
	} from "@/ajax/api/interface/getArticFloow.js"
	import {
		getAuthorLists
	} from "@/ajax/api/interface/getAuthorLists.js"
	import AuthorList from "../../components/AuthorList/AuthorList.vue"
	import {
		ref
	} from "vue";
	const {
		checkLogin
	} = useIsLoggedIn()
	const store = useStore()
	const articleList = ref([])
	const isLoadMore = ref(true)
	const dataNone = ref(false)
	const authorDataNone = ref(false)
	const currentIndex = ref(0)
	const authorList = ref([])
	onShow(async () => {
		await checkLogin()
	})
	uni.$on('updateArticle', () => {
		getArticTxt()
	})
	uni.$on('updatefellow', () => {
		getAuthorList()
	})
	onLoad(async () => {
		await checkLogin()
		await getArticTxt()
		await getAuthorList()
	})

	//获取收藏的文章
	async function getArticTxt() {
		const res = await getArticFloow({
			userId: store.state.userInfo._id,
		})
		if (res.length == 0) {
			dataNone.value = true
		}
		isLoadMore.value = false
		articleList.value = res
	}
	// 获取关注了的作者列表
	async function getAuthorList() {
		const list = await getAuthorLists({
			userId: store.state.userInfo._id,
		})
		if (list.length == 0) {
			authorDataNone.value = true
		}
		authorList.value = list
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		display: flex;
	}

	.follow-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;

		.follow-tab {
			height: 100rpx;
			padding: 0 40rpx;
			border-bottom: 1px solid #f5f5f5;
			@include flex(center);
			box-sizing: content-box;

			.follow-tab-box {
				height: 60rpx;
				display: flex;
				width: 100%;
				border-radius: 10rpx;
				border: 1px solid $base-color;

				.follow-tab-item {
					@include flex(center);
					color: #666;
					font-size: 28rpx;
					flex-grow: 1;

					&:first-child {
						border-right: 1px solid $base-color;
					}

					&.active {
						color: $base-color;
					}
				}
			}
		}

		.follow-list-container {
			flex: 1;

			/* 第二次添加样式 */
			.follow-list-swiper {
				height: 100%;
			}
		}

		.no-data {
			height: 400rpx;
			line-height: 400rpx;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>