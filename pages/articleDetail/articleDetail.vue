<template>
	<view class="article-detail-container">
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
		const res = JSON.parse(JSON.stringify(options.options));
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