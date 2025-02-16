<template>
	<view class="container">
		<view class="task-title">
			<span class="cartoon-text">任</span>
			<span class="cartoon-text">务</span>
			<span class="cartoon-text">列</span>
			<span class="cartoon-text">表</span>
		</view>
		<view class="task-item" v-for="(task, index) in tasks" :key="index" :style="{ backgroundColor: task.bgColor }">
			<view class="task-icon">
				<text class="icon-text" :style="{ color: task.iconColor }">{{ task.icon }}</text>
			</view>
			<view class="task-content">
				<view class="task-name" :style="{ color: task.nameColor }">{{ task.name }}</view>
				<view class="task-desc" :style="{ color: task.descColor }">{{ task.desc }}</view>
				<view class="status-button-wrapper">
					<view class="task-status" :style="{ color: task.statusColor  }">
						<text v-if="task.completed">已完成</text>
						<text v-else>未完成</text>
					</view>
					<view class="complete-button" @click="toggleTaskCompletion(index)">
						<text v-if="task.completed">已完成</text>
						<text v-else>去完成</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tasks: [{
						icon: "📝",
						name: "发布原创文章",
						desc: "撰写并发布一篇不少于 800 字的原创文章",
						completed: false,
						bgColor: "#fce5cd",
						iconColor: "#e69138",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					},
					{
						icon: "📖",
						name: "阅读热门文章",
						desc: "阅读平台推荐的一篇热门文章并点赞",
						completed: false,
						bgColor: "#e6eaf4",
						iconColor: "#3d85c6",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					},
					{
						icon: "✒️",
						name: "编辑已发布文章",
						desc: "对已发布的文章进行内容修改和优化",
						completed: false,
						bgColor: "#f9d8e5",
						iconColor: "#c04000",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					},
					{
						icon: "💬",
						name: "评论文章",
						desc: "在阅读的文章下方发表一条有价值的评论",
						completed: false,
						bgColor: "#d9ead3",
						iconColor: "#38761d",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					},
					{
						icon: "🔖",
						name: "收藏文章",
						desc: "将一篇感兴趣的文章收藏起来",
						completed: false,
						bgColor: "#f4f1de",
						iconColor: "#8c6239",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					},
					{
						icon: "🔍",
						name: "搜索文章",
						desc: "使用搜索功能查找特定主题的文章",
						completed: false,
						bgColor: "#e0e0e0",
						iconColor: "#666",
						nameColor: "#333",
						descColor: "#666",
						statusColor: "#999"
					}
				]
			};
		},
		methods: {
			toggleTaskCompletion(index) {
				this.tasks[index].completed = !this.tasks[index].completed;
			}
		}
	};
</script>

<style scoped>
	.container {
		padding: 20rpx;
	}

	.task-title {
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.cartoon-text {
		font-size: 40rpx;
		font-weight: bold;
		color: #ff6600;
		text-shadow: 2px 2px 0 #ffe4b5, -2px -2px 0 #ffe4b5, 2px -2px 0 #ffe4b5, -2px 2px 0 #ffe4b5;
		margin: 0 10rpx;
		transform: rotate(3deg);
		animation: bounce 0.5s ease-in-out infinite alternate;
	}

	@keyframes bounce {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(-10px);
		}
	}

	.task-item {
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: flex-start;
	}

	.task-icon {
		font-size: 48rpx;
		margin-right: 20rpx;
	}

	.task-content {
		flex: 1;
	}

	.task-name {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.task-desc {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}

	.status-button-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.task-status {
		font-size: 28rpx;
		margin-right: 10rpx;
	}

	.complete-button {
		background-color: #007bff;
		color: #dddddd;
		border-radius: 20rpx;
		padding: 8rpx 16rpx;
		text-align: center;
		cursor: pointer;
		font-size: 24rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s ease-in-out;
	}

	.complete-button:hover {
		background-color: #0056b3;
	}
</style>