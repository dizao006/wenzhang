<template>
	<view class="personal-container">
		<!-- 头部区域 -->
		<view class="header-section">
			<view class="head">
				<view class="avatar-box">
					<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="info-box">
					<text class="nickname">{{userInfo.author_name}}</text>
				</view>
			</view>
			<view class="info-box">
				<text class="job-title">性别：{{userInfo.gender}}</text>
				<text class="job-title">@{{userInfo.professional}}</text>
				<text class="signature">{{userInfo.explain}}</text>

			</view>
			<view class="edit-btn-box" @click="editProfile">
				<button class="edit-btn">编辑</button>
			</view>

		</view>
		<!-- 底部统计区域 -->
		<view class="stats-section">
			<view class="stat-item">
				<text class="stat-label">关注</text>
				<text class="stat-value">{{userInfo.follow_count}}</text>
			</view>
			<view class="stat-item">
				<text class="stat-label">粉丝</text>
				<text class="stat-value">{{userInfo.fans_count}}</text>
			</view>
			<view class="stat-item">
				<text class="stat-label">积分数</text>
				<text class="stat-value">{{userInfo.integral_count}}</text>
			</view>
		</view>
	</view>
	<view>
		<listCard :list='list' v-for="list in articleList" :key="list._id"></listCard>
	</view>
</template>


<script setup>
	import listCard from "@/components/listCard/listCard.vue"
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useIsLoggedIn
	} from "@/common/isLogin.js"
	import {
		useStore
	} from "vuex"
	import {
		getArticleMyList
	} from "@/ajax/api/interface/getArticleMyList.js"
	const {
		checkLogin
	} = useIsLoggedIn()

	const store = useStore()

	const articleList = ref({})
	const isNoData = ref(false)
	const userInfo = ref({})
	onLoad(async () => {
		await checkLogin().then((e) => {
			userInfo.value = e
		})
		await getMyArticleList()
	})

	async function getMyArticleList() {
		const list = await getArticleMyList({
			userId: store.state.userInfo._id
		})
		articleList.value = list
		if (list.length > 0) {
			isNoData.value = true
		}
	}

	function editProfile() {
		uni.navigateTo({
			url: "/pages/dataConfig/dataConfig"
		})
	}
</script>

<style lang="scss">
	.personal-container {
		background-color: #f0f0f0;
		padding: 20px;
	}

	.header-section {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20px;
		flex-direction: column;
	}

	.avatar-box {

		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 15px;
	}

	.avatar {
		width: 100%;
		height: 100%;
	}

	.info-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: -30px;
	}

	.nickname {
		font-size: 20px;
		margin-bottom: 5px;
	}

	.job-title {
		font-size: 14px;
		color: #666;
		margin-bottom: 5px;
	}

	.signature {
		font-size: 14px;
		color: #666;
	}

	.edit-btn-box {
		position: absolute;
		right: 5%;
		top: 10%;
	}

	.edit-btn {
		background-color: #e0e0e0;
		/* 颜色改为浅灰色 */
		color: #333;
		// padding: 6px 10px;
		/* 减小内边距，让按钮变小 */
		border: none;
		border-radius: 6px;
		font-size: 14px;
		/* 减小字体大小 */
	}

	.stats-section {
		display: flex;
		justify-content: space-around;
		background-color: white;
		border-radius: 5px;
		padding: 10px 0;
	}

	.stat-item {
		text-align: center;
	}

	.stat-label {
		font-size: 14px;
		color: #666;
		margin-bottom: 5px;
	}

	.stat-value {
		font-size: 18px;
		color: #333;
	}

	.head {
		display: flex;
	}
</style>