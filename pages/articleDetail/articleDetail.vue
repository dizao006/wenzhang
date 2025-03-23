<template>
	<view class="article-detail-container">
		<view class="ai" @click="changeAi">
			<svg width="35.000000" height="35.000000" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink">
				<path id="path"
					d="M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z"
					fill="#4D6BFE" fill-opacity="1.000000" fill-rule="nonzero" />
			</svg>
		</view>
		<uni-popup ref="aiPopup" type="right">
			<view class="ai-popup-content">
				<AiVue :articleId="Parms._id"></AiVue>
			</view>
			<view class="ai" @click="changeAi">
				<svg width="35.000000" height="35.000000" viewBox="0 0 50 50" fill="none"
					xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path id="path"
						d="M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z"
						fill="#4D6BFE" fill-opacity="1.000000" fill-rule="nonzero" />
				</svg>
			</view>
		</uni-popup>
		<view class="detail-title"> {{ Parms?.title }} </view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="Parms?.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{ Parms?.author.author_name }}
				</view>
				<view class="detail-header-content-info">
					<text>发布时间：{{ Parms?.create_time }}</text><br />
					<text>浏览量：{{ Parms?.browse_count  }}</text>
					<text>赞：{{ Parms?.thumbs_up_count }}</text>
				</view>
			</view>
			<button type="default" class="detail-header-button"
				@click="followAuthor">{{ isFllow ? '取消关注' : '关注'}}</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<uv-parse :content="content" :selectable="true" lazyLoad="true"></uv-parse>
			</view>
			<view class="detail-comment">
				最新评论
			</view>
			<view class="comment-content-cointainer" v-for="item in commentList " :key="item._id">
				<commentBoxVue :commentData="item" @repalyComment="repalyComment"></commentBoxVue>
			</view>
			<view class="no-data" v-if="commentList.length>0">
				暂无评论
			</view>
		</view>

		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="openShow">
				<text>谈谈你的看法....</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box" @click="goComment">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<love :itemId='Parms?._id'></love>
				<view class="detail-bottom-icon-box" @click="setGoodOk">
					<uni-icons :type="isGood ? 'hand-up-filled':'hand-up'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<CommentMasker :isshow='isShow' @closeShow="closeShow" @sendDataComent='sendDataComent'></CommentMasker>
	</view>

</template>

<script setup>
	import love from "../../components/love/love.vue";
	import commentBoxVue from "../../components/comment-box/commentBox.vue";
	import AiVue from "../Ai/Ai.vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		marked
	} from 'marked';
	import {
		computed,
		ref
	} from "vue";
	import {
		updateComent
	} from "@/ajax/api/interface/updateComent.js"
	import getAarticleDetatil from "../../ajax/api/interface/getAarticleDetatil";
	import {
		useIsLoggedIn
	} from "@/common/isLogin.js"
	import {
		useStore
	} from "vuex"
	import {
		getCommentData
	} from "@/ajax/api/interface/getCommentData.js"
	import {
		updateFollow
	} from "@/ajax/api/interface/updateFollow.js"
	import {
		updateGoodOk
	} from "@/ajax/api/interface/updateGoodOk.js"
	const store = useStore()
	const {
		checkLogin
	} = useIsLoggedIn()
	const Parms = ref();
	const isShow = ref(false)
	const commentList = ref({})
	const repalyData = ref()
	const aiPopup = ref() // AI 弹窗引用
	const isShows = ref(false)

	function changeAi() {
		console.log("sss")
		if (isShows.value) {
			aiPopup.value.close() // 打开 AI 弹窗
			isShows.value = false
		} else {
			aiPopup.value.open() // 打开 AI 弹窗
			isShows.value = true
		}

	}
	async function getcommentList() {
		//获取文章的评论列表
		let res = await getCommentData({
			articleId: Parms.value._id,
		})
		return res
	}
	async function openShow() {
		//打开弹窗
		await checkLogin()
		isShow.value = !isShow.value
	}

	function closeShow() {
		isShow.value = !isShow.value
	}

	async function sendDataComent(data) {
		//发送评论内容到后端
		const res = await updateComent({
			userId: store.state.userInfo._id,
			articleId: Parms.value._id,
			content: data,
			...repalyData.value
		})
		uni.showToast({
			title: "发布成功"
		})
		closeShow()
		//修改评论内容成功后，重新获取评论
		repalyData.value = {}
		commentList.value = await getcommentList()

	}

	onLoad(async (options) => {
		const encodedData = options.options;
		const decodedData = decodeURIComponent(encodedData);
		// 将 JSON 字符串转换为对象
		let res = JSON.parse(decodedData);
		let data = await getAarticleDetatil({
			articleId: res._id
		});
		Parms.value = data
		Parms.value.browse_count++
		commentList.value = await getcommentList()
	});
	const content = computed(() => {
		return Parms?.value?.content ? marked(Parms?.value?.content) : null
	})


	function repalyComment(data) {
		//针对某条回复进行评论
		closeShow()
		repalyData.value = {
			'comment_id': data.comment.comment_id,
			isRepaly: data.isRepaly
		}
		data.comment.repaly_id && (repalyData.value.repaly_id = data.comment.repaly_id)
	}

	// 关注
	const isFllow = computed(() => {
		return store.state.userInfo.author_likes_ids.includes(Parms.value?.author.id)
	})
	async function followAuthor() {
		await checkLogin()
		const res = await updateFollow({
			authorId: Parms.value?.author.id,
			userId: store.state.userInfo._id
		})
		uni.showToast({
			title: res.msg
		})
		let follwIds = [...store.state.userInfo.author_likes_ids]
		if (follwIds.includes(Parms.value?.author.id)) {
			follwIds = follwIds.filter((e) => e != Parms.value?.author.id)
		} else {
			follwIds.push(Parms.value?.author.id)
		}
		uni.$emit('updatefellow')
		store.commit('updateUserInfo', {
			...store.state.userInfo,
			author_likes_ids: follwIds
		})
	}

	//点赞相关
	const isGood = computed(() => {
		return store.state.userInfo.thumbs_up_article_ids.includes(Parms.value?._id)
	})

	async function setGoodOk() {
		await checkLogin()
		const res = await updateGoodOk({
			articId: Parms.value._id,
			userId: store.state.userInfo._id
		})
		let isGoodOks = [...store.state.userInfo.thumbs_up_article_ids]
		if (isGoodOks.includes(Parms.value._id)) {
			isGoodOks = isGoodOks.filter((e) => e !== Parms.value._id)
			Parms.value.thumbs_up_count--
		} else {
			isGoodOks.push(Parms.value._id)
			Parms.value.thumbs_up_count++
		}
		store.commit('updateUserInfo', {
			...store.state.userInfo,
			thumbs_up_article_ids: isGoodOks
		})
	}


	//goComment 跳转到评论页面
	function goComment() {
		uni.navigateTo({
			url: `/pages/commentList/commentList?id=${Parms.value._id}`
		})
	}
</script>

<style lang="scss">
	@import "./articleDetail.scss";
</style>