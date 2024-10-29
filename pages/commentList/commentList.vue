<template>
	<view>
		<view class="comment-content-cointainer" v-for="item in commentList " :key="item._id">
			<commentBoxVue :commentData="item" @repalyComment="repalyComment"></commentBoxVue>
		</view>
		<uni-load-more :contentText="{
			contentdown: '上拉加载更多',
			contentrefresh: '正在加载....',
			contentnomore: '暂无更多评论'
		}" v-if="commentList.length===0 || commentList.length>5" :status="loading"></uni-load-more>
		<CommentMasker :isshow='isShow' @closeShow="closeShow" @sendDataComent='sendDataComent'></CommentMasker>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import {
		useStore
	} from "vuex"
	import commentBoxVue from "@/components/comment-box/commentBox.vue"
	import {
		getCommentData
	} from "@/ajax/api/interface/getCommentData.js"
	import {
		updateComent
	} from "@/ajax/api/interface/updateComent.js"
	const articId = ref()
	const commentList = ref([])
	const pageSize = ref(5)
	const page = ref(1)
	const loading = ref('loading')
	const isShow = ref(false)
	const store = useStore()
	const repalyData = ref({})
	onLoad(async (props) => {
		articId.value = props.id
		await getCommentList()
	})

	async function getCommentList() {
		let res = await getCommentData({
			articleId: articId.value,
			pageSize: pageSize.value,
			page: page.value
		});
		if (res.length == 0) {
			loading.value = 'noMore'
			return
		}
		let oldList = JSON.parse(JSON.stringify(commentList.value)) //做一个追加操作
		oldList.push(...res)
		commentList.value = oldList
	}

	function repalyComment(data) {
		closeShow()
		repalyData.value = {
			'comment_id': data.comment.comment_id,
			isRepaly: data.isRepaly
		}
		data.comment.repaly_id && (repalyData.value.repaly_id = data.comment.repaly_id)
	}

	onReachBottom(() => {
		if (loading.value === 'noMore') return
		page.value++
		getCommentList()
	})

	function closeShow() {
		isShow.value = !isShow.value
	}

	async function sendDataComent(data) {
		//发送评论内容到后端
		const res = await updateComent({
			userId: store.state.userInfo._id,
			articleId: articId.value,
			content: data,
			...repalyData.value
		})
		uni.showToast({
			title: "发布成功"
		})
		closeShow()
		//修改评论内容成功后，重新获取评论
		repalyData.value = {}
		page.value = 1
		commentList.value = []
		loading.value = 'loading'
		await getCommentList()
	}
</script>

<style scoped lang="scss">
	.comment-content-cointainer {
		padding: 0 30rpx;
		border-bottom: 1px solid red;
	}
</style>