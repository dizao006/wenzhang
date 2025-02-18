<template>
	<view class="markdown-editor">
		<view class="header">
			<text @click="goBack">返回</text>
			<text @click="preview">预览</text>
			<text @click="save">下一步</text>
		</view>
		<input type="text" v-model="title" placeholder="请输入标题" />
		<view class="line"></view>
		<!-- Markdown 编辑器容器 -->
		<MdEditor v-model="content" height="calc(100vh - 150px)" ref="editorRef" />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		generateArticleId
	} from "@/common/uuid.js";
	import {
		useStore
	} from "vuex";
	import MdEditor from 'md-editor-v3';
	import 'md-editor-v3/lib/style.css';

	const store = useStore();

	// 标题
	const title = ref('');
	// 正文内容
	const content = ref('');
	// Markdown 编辑器实例
	const editorRef = ref(null);

	// 生成文章 ID
	let articId = generateArticleId();

	// 返回方法
	const goBack = async () => {
		uni.showToast({
			title: '自动保存成功',
			icon: 'success'
		});
		await save();
		content.value = "";
		title.value = "";
		articId = generateArticleId();
		uni.switchTab({
			url: '/pages/index/index'
		});
	};

	// 预览方法
	const preview = async () => {
		await save();
		uni.navigateTo({
			url: `/pages/preView/preView?id=${articId}&title=${encodeURIComponent(title.value)}`,
		});
	};

	// 保存方法
	const save = () => {
		const data = {
			id: articId,
			title: title.value,
			md: content.value
		};
		store.commit('addArticList', data);
	};
</script>

<style scoped lang="scss">
	.markdown-editor {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;

			text {
				font-size: 14px;
				margin-left: 10px;
			}
		}

		input {
			margin-bottom: 18px;
			padding: 5px;
			border-radius: 5px;
		}

		.editor-container {
			height: calc(100vh - 150px); // 确保编辑器高度足够
			width: 100%;
			margin-bottom: 10px;
			padding: 5px;
			border-radius: 5px;
		}

		.line {
			width: 95vw;
			outline: 1rpx solid rgba(117, 117, 117, 0.6);
		}
	}
</style>