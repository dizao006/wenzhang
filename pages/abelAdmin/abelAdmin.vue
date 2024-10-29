<template>
	<view class="label-container">
		<view class="label-box">
			<view class="header">
				<view class="title">
					我的标签
				</view>
				<view class="edit" @click="changeEdit">
					{{isEdit ? '完成' : '编辑'}}
				</view>
			</view>
			<view class="label-content">
				<view v-if='showList.length' class="content-title-item" v-for="(item,index) in showList "
					:key="item._id">
					{{item.name}}
					<uni-icons @click="removeListItem(item)" v-if="isEdit" class="inco-close" type="clear" size="20"
						color="red"></uni-icons>
				</view>
				<view class="noData" v-if="!showList.length">
					当前没有数据
				</view>
			</view>
		</view>
		<!-- 标签推荐 -->
		<view class="label-box">
			<view class="header">
				<view class="title">
					标签推荐
				</view>
			</view>
			<view class="label-content">
				<view class="content-title-item" @click="changeSelfItem(item)" v-for="(item,index) in noList "
					:key="item._id">
					{{item.name}}
				</view>
				<view class="noData" v-if="!noList.length>0">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref,
		toRefs,
		watch
	} from 'vue';
	import {
		useStore
	} from "vuex"
	import {
		updateLableItem
	} from '../../ajax/api/interface/updateLableItem';
	import {
		getLableList
	} from "../../ajax/api/interface/home.js"
	import {
		setlabelListItem
	} from "@/ajax/api/interface/setlabelListItem.js"
	const isEdit = ref(false)

	const store = useStore()
	const {
		labelList,
		userInfo
	} = store.state
	const allLable = ref()
	onMounted(async () => {
		allLable.value = await getLableList()
	})
	const cloneLableList = ref()
	const noList = computed(() => {
		return labelList.filter((item) => !cloneLableList.value.includes(item._id) && item._id)
	})
	const showList = computed(() => {
		return labelList.filter((item) => cloneLableList.value.includes(item._id))
	})
	watch(() => userInfo, (n, o) => {
		cloneLableList.value = n.labelIds
	}, {
		immediate: true,
		deep: true
	})

	function changeEdit() {
		if (isEdit.value) {
			updateLable() //更新标签
		}
		isEdit.value = !isEdit.value
	}
	async function updateLable() {
		let {
			message
		} = await updateLableItem({
			labelList: cloneLableList.value,
			userId: userInfo._id
		})
		uni.showToast({
			title: message
		})


		const showTable = allLable.value.filter((e) => {
			return cloneLableList.value.includes(e._id)
		})
		store.commit('setlabelListItem', showTable)
		await setlabelListItem({
			showTable,
			userId: userInfo._id
		})
		store.commit('updateUserInfo', {
			...userInfo,
			labelIds: cloneLableList.value,
			labelListItem: showTable
		})
	}

	function changeSelfItem(item) {
		if (!isEdit.value) return
		cloneLableList.value.push(item._id)
	}

	function removeListItem(item) {
		if (!isEdit.value) return
		cloneLableList.value = cloneLableList.value.filter((e) => e !== item._id)
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss"
</style>