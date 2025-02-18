<template>
	<view class="markdown-editor">
		<!-- 顶部操作栏 -->
		<view class="header">
			<text @click="goBack">返回</text>
			<text @click="togglePreview">{{ isPreview ? "编辑" : "预览" }}</text>
			<text @click="save">保存</text>
			<!-- 下拉框选择标签 -->
			<picker mode="selector" :range="tagList" :value="selectedTagIndex" @change="onTagChange">
				<view class="picker">
					{{ tagList[selectedTagIndex] }}
				</view>
			</picker>
			<text @click="publish">发布</text>
		</view>

		<!-- 输入标题 -->
		<input type="text" v-model="title" placeholder="请输入标题" class="title-input" />

		<!-- 分割线 -->
		<view class="line"></view>

		<!-- Markdown 编辑器 -->
		<view v-if="!isPreview" class="mdBjk">
			<textarea v-model="content" placeholder="请输入 Markdown 内容" class="editor-textarea"
				:maxlength="MAX_LENGTH"></textarea>
			<view class="word-count">已输入 {{ content.length }} / {{ MAX_LENGTH }} 字</view>
		</view>

		<!-- Markdown 预览 -->
		<view v-if="isPreview" class="preview-container" v-html="previewContent"></view>
	</view>
</template>

<script setup>
	import {
		addDrafts
	} from "@/ajax/api/interface/addDrafts.js";
	import {
		ref,
		onMounted
	} from "vue";
	import {
		generateArticleId
	} from "@/common/uuid.js";
	import {
		useStore
	} from "vuex";
	import {
		marked
	} from "marked";
	import {
		times
	} from "@/common/time.js";
	import {
		fabu
	} from "@/ajax/api/interface/fabu.js";
	import {
		getArticleById
	} from "@/ajax/api/interface/getArticleById.js"; // 新增接口引入
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import htmlToMd from 'html-to-md';
	const store = useStore();

	// 标题
	const title = ref("");
	// 正文内容（Markdown 格式）
	const content = ref("");
	// 预览内容（HTML 格式）
	const previewContent = ref("");
	// 是否处于预览状态
	const isPreview = ref(false);
	// 最大输入字数
	const MAX_LENGTH = 99999;

	// 文章 ID，初始化为空
	const articleId = ref("");

	// 标签列表
	const tagList = ref([
		"前端开发",
		"后端开发",
		"移动开发",
		"职场生活",
		"精彩直播",
		"每日一题"
	]);

	// 选中标签的索引
	const selectedTagIndex = ref(0);

	// 返回方法
	const goBack = async () => {
		uni.showToast({
			title: "自动保存成功",
			icon: "success"
		});
		await save();
		content.value = "";
		title.value = "";
		selectedTagIndex.value = 0;
		uni.switchTab({
			url: "/pages/index/index"
		});
	};

	// 切换预览方法
	const togglePreview = () => {
		isPreview.value = !isPreview.value;
		if (isPreview.value) {
			// 在预览模式下解析 Markdown 为 HTML
			previewContent.value = marked(content.value);
		}
	};

	// 处理标签选择变化
	const onTagChange = (e) => {
		selectedTagIndex.value = e.detail.value;
	};

	// 保存为草稿
	const save = async () => {
		const data = {
			abstractText: content.value.slice(0, 20),
			author: {
				author_name: store.state.userInfo.author_name,
				avatar: store.state.userInfo.avatar,
				id: store.state.userInfo.id,
				_id: store.state.userInfo._id
			},
			browse_count: 0,
			classify: tagList.value[selectedTagIndex.value],
			collection_count: 0,
			comments_count: 0,
			content: marked(content.value),
			cover: [],
			create_time: times(),
			articleId: articleId.value, // 使用当前的 articleId
			userId: store.state.userInfo._id,
			title: title.value,
			thumbs_up_count: 0,
			status: "draft",
			comments: [],
			"mode": "base",
			tags: [tagList.value[selectedTagIndex.value]]
		};

		store.commit("addArticList", data);
		await addDrafts({
			Drafts: data,
			id: store.state.userInfo._id,
			articleId: articleId.value // 使用当前的 articleId
		});
		uni.showToast({
			title: "保存为草稿成功",
			icon: "success"
		});
	};

	// 发布文章
	const publish = async () => {
		if (!title.value || !content.value) {
			uni.showToast({
				title: "标题或内容不能为空",
				icon: "error"
			});
			return;
		}
		const data = {
			abstractText: content.value.slice(0, 20),
			author: {
				author_name: store.state.userInfo.author_name,
				avatar: store.state.userInfo.avatar,
				id: store.state.userInfo.id,
				_id: store.state.userInfo._id
			},
			browse_count: 0,
			classify: tagList.value[selectedTagIndex.value],
			collection_count: 0,
			comments_count: 0,
			content: marked(content.value),
			cover: [],
			create_time: times(),
			articleId: articleId.value, // 使用当前的 articleId
			userId: store.state.userInfo._id,
			title: title.value,
			thumbs_up_count: 0,
			status: "published",
			comments: [],
			"mode": "base",
			tags: [tagList.value[selectedTagIndex.value]]
		};
		store.commit("addArticle", data);
		await fabu({
			Drafts: data,
			userId: store.state.userInfo._id,
			articleId: articleId.value // 使用当前的 articleId
		});
		uni.showToast({
			title: "发布成功",
			icon: "success"
		});
		content.value = "";
		title.value = "";
		selectedTagIndex.value = 0;
	};

	// 页面加载时获取文章数据
	onLoad(async (options) => {
		if (options.articleId) {
			// 编辑模式：使用传递过来的 articleId
			articleId.value = options.articleId;
			const res = await getArticleById({
				articleId: options.articleId
			});
			const articleData = res;
			title.value = articleData.title;
			content.value = htmlToMd(articleData.content)
			const tagIndex = tagList.value.indexOf(articleData.classify);
			if (tagIndex > -1) {
				selectedTagIndex.value = tagIndex;
			}
		} else {
			// 新建模式：生成新的 articleId
			articleId.value = generateArticleId();
		}
	});
</script>

<style scoped lang="scss">
	.markdown-editor {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			background-color: #f5f5f5;

			text {
				font-size: 14px;
				margin-left: 10px;
				cursor: pointer;
			}

			.picker {
				padding: 5px 10px;
				border: 1px solid #ccc;
				border-radius: 5px;
				margin: 5px;
				cursor: pointer;
			}
		}

		.title-input {
			margin: 10px;
			padding: 8px;
			font-size: 16px;
			border: 1px solid #ddd;
			border-radius: 5px;
			width: calc(100% - 20px);
		}

		.line {
			width: 95vw;
			outline: 1rpx solid rgba(117, 117, 117, 0.6);
			margin: 10px 0;
		}

		.editor-textarea {
			/* 让 textarea 占满剩余空间 */
			flex: 1;
			width: calc(100% - 40px);
			height: 50vh;
			margin: 10px;
			padding: 10px;
			font-size: 14px;
			border: 1px solid #ddd;
			border-radius: 5px;
			resize: none;
			line-height: 1.6;
			background-color: #fafafa;
		}

		.preview-container {
			/* 让预览容器占满剩余空间 */
			flex: 1;
			padding: 10px;
			margin: 10px;
			background-color: #fff;
			border-radius: 5px;
			overflow-y: auto;
			line-height: 1.6;
			color: #333;
			border: 1px solid #ddd;
		}

		.word-count {
			margin: 0 10px;
			font-size: 12px;
			color: #999;
		}
	}
</style>