export default ({
	name,
	data = {}
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...'
		}); // 显示加载提示
		uniCloud.callFunction({
			name,
			data,
			success({
				result
			}) {
				uni.hideLoading(); // 隐藏加载提示
				if (result.code === 0) {
					resolve(result.data);
				} else {
					uni.showToast({
						icon: "none",
						title: result.msg || '未知错误',
					});
					reject(new Error(result.msg || '未知错误')); // 传递错误信息
				}
			},
			fail(err) {
				uni.hideLoading(); // 隐藏加载提示
				uni.showToast({
					icon: "none",
					title: err.message || '请求失败',
				});
				reject(err); // 传递错误对象
			},
		});
	});
};