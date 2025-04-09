<template>
	<view class="container">
		<div @click="scanCode">
			<uni-icons type="scan" size="25"></uni-icons>
		</div>
		<view v-if="scanResult" class="result">
			<text>扫码结果：</text>
			<text>{{ scanResult }}</text>
		</view>
		<!-- 保留拍照功能 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoPath: '',
				scanResult: ''
			}
		},
		methods: {
			// 扫码方法
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true, // 只允许从相机扫码
					scanType: ['barCode', 'qrCode'], // 扫码类型
					success: (res) => {
						console.log('扫码结果:', res)
						this.scanResult = res.result
						// 可以根据结果做不同处理
						this.handleScanResult(res)
					},
					fail: (err) => {
						console.error('扫码失败:', err)
						uni.showToast({
							title: '扫码失败',
							icon: 'none'
						})
					}
				})
			},

			// 处理扫码结果
			handleScanResult(res) {
				// 示例：如果是URL则打开
				if (res.result.startsWith('http')) {
					uni.showModal({
						title: '扫码结果',
						content: '检测到链接，是否打开？',
						success: (modalRes) => {
							if (modalRes.confirm) {
								uni.navigateTo({
									url: '/pages/webview/webview?url=' + encodeURIComponent(res.result)
								})
							}
						}
					})
				} else {
					uni.showModal({
						title: '扫码结果',
						content: res.result,
						showCancel: false
					})
				}
			},

			// 保留原有的拍照方法
			takePhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera'],
					success: (res) => {
						this.photoPath = res.tempFilePaths[0]
						console.log('拍照成功:', res.tempFilePaths)
					},
					fail: (err) => {
						console.error('拍照失败:', err)
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		text-align: center;
	}

	.preview {
		width: 100%;
		height: 300px;
		margin-top: 20px;
	}

	.result {
		margin-top: 20px;
		padding: 10px;
		background-color: #f5f5f5;
		border-radius: 5px;
		word-break: break-all;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>