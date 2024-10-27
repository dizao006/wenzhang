<template>
	<view class="search-container">
		<NavBar :isSearch='isSearch' @sendSearchData="sendSearchData" @updateValue="updateValue"
			:serchValue="serchValue"></NavBar>
		<view class="serch-history" v-if="isShowHistory">
			<view class="serch-container">
				<view class="serach-header">
					<text class="history-text">搜索历史</text>
					<text class="clear" @click="store.commit('clearData')">清空</text>
				</view>
			</view>
			<view class="serch-list" v-if="store.state.historyList.length>0">
				<view @click="openHistory(item)" class="history-content-item"
					v-for="(item,index) in store.state.historyList" :key="item">
					{{item}}
				</view>
			</view>
			<!-- 没有内容的展示 -->
			<view class="no-data" v-else>
				当前没有搜索历史
			</view>
			<!-- 开始搜索操作 -->
		</view>
		<view class="serach-list-container" v-else>
			<ListItem :articleList='serchList' :saveSearchHistory="saveSearchHistory" :isLoadMore="isload"
				v-if="serchList.length>=0"></ListItem>
			<view class="no-data" v-else>
				没有搜索到数据
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		useStore
	} from "vuex"
	import {
		ref
	} from 'vue';
	import NavBar from '../../components/NavBar/NavBar.vue';
	import ListItem from "@/components/ListItem/ListItem.vue"
	import {
		get_search_data
	} from "@/ajax/api/interface/get_search_data.js"
	const isSearch = ref(true)
	const serchValue = ref('')
	const serchList = ref([])
	const isload = ref(false)
	const isShowHistory = ref(true)
	const store = useStore()

	function saveSearchHistory() {
		console.log(serchValue.value, 'asdasd')
		//进行本地存储
		store.commit('setHistoryList', serchValue.value)
	}

	function updateValue(data) {
		serchValue.value = data
	}
	async function sendSearchData() {
		//发送数据到云服务器
		isShowHistory.value = false
		if (!serchValue.value) {
			isShowHistory.value = true
			serchList.value = []
			return
		}
		const {
			articleList
		} = await get_search_data({
			searchVal: serchValue.value
		})
		serchList.value = articleList
	}

	function openHistory(value) {
		//点击历史记录
		updateValue(value)
		sendSearchData()
	}
</script>

<style lang="scss" scoped>
	@import "./css/serch.scss"
</style>