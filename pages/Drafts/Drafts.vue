<template>
	<view class="draft-box">
		<!-- 页面标题 -->
		<view class="title">草稿箱</view>
		<!-- 草稿列表 -->
		<view class="draft-list">
			<view v-for="draft in drafts" :key="draft.articleId" class="draft-card">
				<!-- 草稿标题 -->
				<view class="draft-content" @click="goToEdit(draft.articleId)">
					<view class="draft-title">{{ draft.title }}</view>
					<!-- 草稿摘要 -->
					<view class="draft-abstract">{{ draft.abstractText }}</view>
					<!-- 草稿创建时间 -->
					<view class="draft-time">{{ draft.create_time }}</view>
				</view>

				<!-- 操作按钮 -->
				<view class="draft-actions">
					<button class="edit-btn" @click.stop="goToEdit(draft.articleId)">编辑</button>
					<button class="delete-btn" @click.stop="deleteDraft(draft.articleId)">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		getDrafts
	} from '@/ajax/api/interface/getDrafts.js';
	import {
		useStore
	} from 'vuex';
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		removeDrafts
	} from '../../ajax/api/interface/removeDrafts';
	const store = useStore();
	// 存储草稿列表
	const drafts = ref([]);

	// 获取草稿列表数据
	const fetchDrafts = async () => {
		try {
			const userId = store.state.userInfo._id;
			const res = await getDrafts({
				userId
			});

			drafts.value = res;
		} catch (error) {
			console.error('获取草稿列表失败:', error);
		}
	};

	// 跳转到文章编辑页
	const goToEdit = (articleId) => {
		uni.redirectTo({
			url: `/pages/articpush/articpush?articleId=${articleId}`
		})
	};

	// 删除草稿
	const deleteDraft = async (articleId) => {
		try {
			// 从草稿列表中移除（假设有一个 API 接口 deleteDraft 用于删除草稿）
			drafts.value = drafts.value.filter((draft) => draft.articleId !== articleId);
			await removeDrafts({
				articleId
			})
			await fetchDrafts();
			uni.showToast({
				title: '草稿已删除',
				icon: 'success'
			});
		} catch (error) {
			console.error('删除草稿失败:', error);
			uni.showToast({
				title: '删除失败',
				icon: 'error'
			});
		}
	};

	// 页面挂载时获取草稿列表
	onMounted(() => {
		fetchDrafts();
	});

	// 页面显示时获取草稿列表
	onShow(() => {
		fetchDrafts();
	});
</script>

<style scoped lang="scss">
	.draft-box {
		padding: 20px;

		.title {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
		}

		.draft-list {
			.draft-card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				padding: 15px;
				margin-bottom: 15px;

				.draft-content {
					flex: 1;
					cursor: pointer;

					.draft-title {
						font-size: 18px;
						font-weight: bold;
						margin-bottom: 5px;
					}

					.draft-abstract {
						font-size: 14px;
						color: #666;
						margin-bottom: 10px;
					}

					.draft-time {
						font-size: 12px;
						color: #999;
					}
				}

				.draft-actions {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 10px;

					.edit-btn,
					.delete-btn {
						padding: 5px 10px;
						font-size: 14px;
						border: none;
						border-radius: 4px;
						cursor: pointer;
					}

					.edit-btn {
						background-color: #007bff;
						color: #fff;
					}

					.delete-btn {
						background-color: #dc3545;
						color: #fff;
					}
				}
			}
		}
	}
</style>