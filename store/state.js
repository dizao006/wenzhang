export default {
	userInfo: uni.getStorageSync('userInfo') || null,
	historyList: uni.getStorageSync('historyList') || [],
	labelList: uni.getStorageSync('labelList') || [],
	labelListItem: uni.getStorageSync('labelListItem') || [],
	articList: {},
	selected: []
}