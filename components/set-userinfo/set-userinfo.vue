<template>
	<view class="body">
		<view class="set-userinfo">
			<view class="set-userinfo-list">
				<view class="set-userinfo-list-left">头像</view>
				<view class="set-userinfo-list-right" @click="changeimage">
					<view class="set-userinfo-list-right-pic">
						<image :src="userpic" mode="aspectFill" lazy-load></image>
					</view>
					<view class="set-userinfo-list-right-icon icon iconfont">&#xe668;</view>
				</view>

			</view>
			<view class="set-userinfo-list">
				<view class="set-userinfo-list-left">昵称</view>
				<view class="set-userinfo-list-right">
					<input class="set-userinfo-list-right-name" type="text" v-model="author_name" />
					<view class="set-userinfo-list-right-icon icon iconfont">&#xe668;</view>
				</view>

			</view>
			<view class="set-userinfo-list">
				<view class="set-userinfo-list-left">性别</view>
				<view class="set-userinfo-list-right" @click="changeOne('sex')">
					<view class="set-userinfo-list-right-name">
						{{sex}}
					</view>
					<view class="set-userinfo-list-right-icon icon iconfont">&#xe668;</view>
				</view>

			</view>
			<view class="set-userinfo-list">
				<view class="set-userinfo-list-left">个性签名</view>
				<view class="set-userinfo-list-right">
					<input class="set-userinfo-list-right-name" type="text" v-model="explain" />
					<view class="set-userinfo-list-right-icon icon iconfont">&#xe668;</view>
				</view>
			</view>
			<view class="set-userinfo-list">
				<view class="set-userinfo-list-left">职业</view>
				<view class="set-userinfo-list-right">
					<input class="set-userinfo-list-right-name" type="text" v-model="professional" />
					<view class="set-userinfo-list-right-icon icon iconfont">&#xe668;</view>
				</view>
			</view>
			<button class="button" type="default" @click="submit">完成</button>
		</view>
		<mpvue-city-picker theme-color="#007aff" ref="mpvueCityPicker" :picker-value-default="pickerValueDefault"
			@onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	let sex = ['不限', '男', '女'];
	import mpvueCityPicker from "./mpvue-citypicker/mpvueCityPicker.vue";

	export default {
		props: ['userInfo'],
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				author_name: '',
				userpic: '',
				sex: '',
				professional: '',
				explain: '',
				pickerValueDefault: [0, 2, 1]
			};
		},
		created() {
			this.author_name = this.userInfo.author_name;
			this.userpic = this.userInfo.avatar;
			this.sex = this.userInfo.gender;
			this.professional = this.userInfo.professional;
			this.explain = this.userInfo.explain;
		},
		methods: {
			onConfirm(e) {
				this.pickerText = JSON.stringify(e.label);
				console.log(this.pickerText);
			},
			openPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			changeimage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.userpic = res.tempFilePaths;
					}
				});

			},
			// 单列选择
			changeOne(val) {
				let arr = [];
				switch (val) {
					case 'sex':
						arr = sex;
						break;
						// 这里需要定义qg和job，假设先初始化为空数组
					case 'qg':
						arr = [];
						break;
					case 'job':
						arr = [];
						break;
				}
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						switch (val) {
							case 'sex':
								this.sex = arr[res.tapIndex];
								break;
							case 'qg':
								this.qg = arr[res.tapIndex];
								break;
							case 'job':
								this.job = arr[res.tapIndex];
								break;
						}
					}
				});
			},
			submit() {

			}
		}
	};
</script>

<style lang="scss" scoped>
	@import url("iconfont.css");

	.body {
		margin: 20rpx 25rpx;

		.set-userinfo {
			border-top: 1rpx solid #F2F2F2;

			.set-userinfo-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 25rpx;
				border-bottom: 1rpx solid #F2F2F2;

				.set-userinfo-list-left {
					font-size: 30rpx;
					color: #989898;
					font-weight: 500;
				}

				.set-userinfo-list-right {
					display: flex;
					justify-content: center;
					align-items: center;

					.set-userinfo-list-right-pic {
						width: 90rpx;
						height: 90rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 100%;
						}
					}

					.set-userinfo-list-right-name {
						display: flex;
						align-items: center;
						font-size: 30rpx;

						text-align: right;
					}

					.set-userinfo-list-right-icon {
						font-size: 45rpx;
						color: #989898;
						margin-left: 30rpx;
					}
				}
			}

			.button {
				margin-top: 30rpx;
				width: 95%;
				background-color: #007aff;
				font-size: 30rpx;
				color: #ffffff;
				border: 0;
			}
		}
	}
</style>