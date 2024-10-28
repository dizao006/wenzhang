<template>
	<view class="article-detail-container">
		<view class="detail-title"> {{ Parms.title }} </view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="Parms.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{ Parms.author.author_name }}
				</view>
				<view class="detail-header-content-info">
					<text>发布时间：{{ Parms.create_time }}</text><br />
					<text>浏览量：{{ Parms.thumbs_up_count }}</text>
					<text>收藏：{{ Parms.browse_count }}</text>
				</view>
			</view>
			<button type="default" class="detail-header-button">取消关注</button>
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
				<view class="detail-bottom-icon-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons type="hand-up" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<CommentMasker :isshow='isShow' @closeShow="closeShow" @sendDataComent='sendDataComent'></CommentMasker>
	</view>
</template>

<script setup>
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
	const store = useStore()
	const {
		checkLogin
	} = useIsLoggedIn()
	const Parms = ref();

	const isShow = ref(false)
	const commentList = ref({})

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
		getcommentList()
	}

	onLoad(async (options) => {
		Parms.value = JSON.parse(options.options);
		let data = await getAarticleDetatil({
			articleId: Parms.value._id
		});
		Parms.value = data
		commentList.value = await getcommentList()
	});
	const content = computed(() => {
		return Parms.value.content ? marked(Parms?.value?.content) : null
	})

	const repalyData = ref()

	function repalyComment(data) {
		//针对某条回复进行评论
		console.log(data, 'sssddd')
		closeShow()
		repalyData.value = {
			'comment_id': data.comment.comment_id,
			isRepaly: data.isRepaly
		}
		data.comment.repaly_id && (repalyData.value.repaly_id = data.comment.repaly_id)
	}
</script>

<style lang="scss">
	@import "./articleDetail.scss";
</style>