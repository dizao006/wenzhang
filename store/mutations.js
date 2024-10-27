export default {
	updateUserInfo(state, userInfo) {
		state.userInfo = userInfo
		uni.setStorage({
			key: "userInfo",
			data: userInfo
		})
	},
	setHistoryList(state, value) {
		let list = state.historyList
		if (list.length > 0 && (list.findIndex((e) => e == value)) != -1) return
		list.unshift(value)
		uni.setStorageSync('historyList', list)
		state.historyList = list
	},
	clearData(state) {
		uni.showToast({
			title: "清空成功",
			icon: 'none'
		});
		state.historyList = []
		uni.setStorageSync('historyList', [])
	}
}