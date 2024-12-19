<template>
	<view class="markdown-editor">
		<view class="header">
			<text @click="goBack">返回</text>
			<text @click="preview">预览</text>
			<text @click="save">下一步</text>
		</view>
		<input type="text" v-model="title" placeholder="请输入标题" />
		<view class="line">

		</view>
		<textarea v-model="content" placeholder="请输入正文"></textarea>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	import {
		generateArticleId
	} from "@/common/uuid.js"
	import {
		useStore
	} from "vuex"
	import MarkdownIt from 'markdown-it';
	const store = useStore()
	// 标题
	const title = ref('');
	// 正文内容
	const content = ref('');
	// 是否处于预览状态
	const isPreview = ref(false);
	// 预览文件路径
	const previewUrl = ref('');
	const ht = ref('')
	let articId = generateArticleId()
	// 返回方法
	const goBack = async () => {
		uni.showToast({
			title: '自动保存成功',
			icon: 'success'
		})
		await save()
		content.value = ""
		title.value = ""
		articId = generateArticleId()
		uni.switchTab({
			url: '/pages/index/index'
		});
	};

	// 预览方法
	const preview = async () => {
		await save()
		uni.navigateTo({
			url: `/pages/preView/preView?id=${articId}`,
		});
	};

	// 保存方法
	const save = () => {
		const md = new MarkdownIt();
		const html = md.render(content.value);
		const data = {
			id: articId,
			title: title.value,
			html: html
		}
		store.commit('addArticList', data)
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

		textarea {
			height: 100vh;
			width: 100%;
			margin-bottom: 10px;
			padding: 5px;
			border-radius: 5px;
		}

		.preview-container {
			flex: 1;
			width: 100%;
		}

		.line {
			width: 95vw;
			outline: 1rpx solid rgba(117, 117, 117, 0.6);
		}
	}
</style>