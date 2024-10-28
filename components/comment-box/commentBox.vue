<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="props.commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!props.commentData.isRepaly">
					{{props.commentData.author.author_name }}
				</view>
				<view class="title" v-else>
					{{props.commentData.author.author_name }}
					<text class="reply-text"> 回复 </text>
					{{props.commentData.to}}
				</view>
				<view class="">
					<uni-dateformat :date="props.commentData.createTime" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="comment-content">
			<view class="">
				{{props.commentData.content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentRepaly({comment:commentData, isRepaly})">
					回复
				</view>
			</view>
			<!-- 子回复内容展示 -->
			<view class="repaly-comment" v-for="item in props.commentData.replay" :key='item.comment_id'>
				<commentBox :isRepaly="true" :commentData='item' @repalyComment='commentRepaly'></commentBox>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const emit = defineEmits(['repalyComment'])
	const props = defineProps({
		commentData: {
			type: Object,
			default: () => ({}) // 默认值是一个空对象
		},
		isRepaly: {
			type: Boolean,
			default: false // 默认值为 false
		}
	})

	function commentRepaly(data) {
		console.log(data, 'sss')
		//区分主回复还是子回复
		if (data.isRepaly) {
			data.comment.repaly_id = data.comment.comment_id
			data.comment.comment_id = props.commentData.comment_id
		}
		// 向article发送的时候只有一次
		emit('repalyComment', data)
	}
</script>

<style lang="scss" scoped>
	.comment-box {
		margin: 30rpx 0;

		.comment-header {
			@include flex(flex-start);
			align-items: flex-start;

			.comment-header-logo {
				flex-shrink: 0;
				width: 60rpx;
				height: 60rpx;
				border-radius: 10rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-header-info {
				@include flex(flex-start, column);
				align-items: flex-start;
				padding-left: 30rpx;
				font-size: 24rpx;
				color: #6c6c6c;
				line-height: 1;

				.title {
					margin-bottom: 20rpx;
					font-size: 28rpx;
					color: #333;
				}
			}
		}

		.comment-content {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #000;

			.comment-info {
				margin-top: 30rpx;
				display: flex;

				.comment-button {
					padding: 4rpx 20rpx;
					font-size: 24rpx;
					color: #6c6c6c;
					border-radius: 40rpx;
					border: 1px solid #ccc;
				}
			}

			// 添加回复组件样式
			.repaly-comment {
				padding-left: 40rpx;
				border-bottom: 1px solid red;
			}
		}
	}

	.reply-text {
		margin: 0 20rpx;
		font-weight: bold;
		color: #800000;
	}
</style>