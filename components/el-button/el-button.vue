<template>
	<view @click="btnClick" class="fs20 el-button m-l10" :type="!type?'':typeList[type]['type']" :class="getClass()">
		<template v-if="loading">
			<i class="el-icon-loading"></i>
		</template>
		<template v-if="icon&&!loading">
			<i :class="icon"></i>
		</template>
		<template v-if="$slots.default">
			<slot></slot>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'layout-button',
		props: {
			/**
			 * 加载动画
			 */
			loading: {
				type: Boolean,
				default: false
			},
			/**
			 * 按钮类型
			 */
			type: {
				type: String,
				default: ''
			},
			/**
			 * 是否是文字按钮
			 */
			isText: {
				type: Boolean,
				default: false
			},
			/**
			 * 图标字符
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 朴素
			 */
			plain: {
				type: Boolean,
				default: false
			},
			/**
			 * 圆角
			 */
			round: {
				type: Boolean,
				default: false
			},
			/**
			 * 尺寸
			 */
			size: {
				type: String,
				default: '', //medium / small / mini
			},
			/**
			 * 圆形图标
			 */
			circle: {
				type: Boolean,
				default: false
			},
		},
		computed: {

		},
		data() {
			return {
				sizeObj: {
					'medium': 'el-button--medium',
					'small': 'el-button--small',
					'mini': 'el-button--mini'
				},

				typeList: {
					success: {
						class: ['el-button--success'],
						type: '',
						text: ['c-s', 'b-t', 'bor-0'],
					},
					danger: {
						class: ['el-button--danger'],
						text: ['c-d', 'b-t', 'bor-0'],
						type: 'warn'
					},
					error: {
						class: ['el-button--danger'],
						text: ['c-d', 'b-t', 'bor-0'],
						type: 'warn'
					},
					default: {
						class: ['el-button--primary'],
						text: ['c-p', 'b-t', 'bor-0'],
						type: 'default'
					},
					primary: {
						class: ['el-button--primary'],
						text: ['c-p', 'b-t', 'bor-0'],
						type: 'primary'
					},
					warning: {
						class: ['el-button--warning'],
						text: ['c-w', 'b-t', 'bor-0'],
						type: ''
					},
					info: {
						class: ['el-button--info'],
						text: ['b-t', 'bor-0'],
						type: ''
					},
				}
			};
		},
		methods: {
			getClass() {
				let cls = !this.type ? [] : this.typeList[this.type][this.isText ? 'text' : 'class'];
				let clasObj = {
					"loading": "is-loading",
					"disabled": "is-disabled",
					"plain": "is-plain",
					"round": "is-round",
					"circle": "is-circle",
					"isText": ['b-t', 'bor-0']
				}
				Object.keys(clasObj).map(key => {
					if (this[key]) {
						cls[cls.length] = clasObj[key];
					} else {
						cls = cls.filter(item => item != clasObj[key]);
					}
				});
				if (!this.size) {
					let val = this.sizeObj[this.size];
					cls = cls.filter(item => item != val);
				} else {
					let val = this.sizeObj[this.size];
					cls[cls.length] = val;
				}


				// if (this.loading) {
				// 	cls[cls.length] = "is-loading";
				// } else {
				// 	cls = cls.filter(item => item != 'is-loading');
				// }
				// if (this.disabled) {
				// 	cls[cls.length] = "is-disabled";
				// } else {
				// 	cls = cls.filter(item => item != 'is-disabled');
				// }
				// if (this.plain) {
				// 	cls[cls.length] = "is-plain";
				// } else {
				// 	cls = cls.filter(item => item != 'is-plain');
				// }

				return cls;
			},
			btnClick() {
				this.$emit("click", this.$props)
			}
		}
	}
</script>

<style lang="scss">
	.el-button.bor-0 {
		line-height: 20rpx !important;
		margin: 0rpx !important;
		flex-shrink: 1;
		width: auto;
		padding: 4rpx 6rpx;
	}


	.el-button {
		font-size: 20rpx;
		padding: 10rpx 24rpx;
		border-radius: 4rpx !important;
	}

	.el-button.is-round {
		border-radius: 20rpx !important;
		padding: 12rpx 23rpx !important;
	}

	.el-button.is-circle {
		-webkit-border-radius: 50% !important;
		border-radius: 50% !important;
		padding: 12rpx !important;
	}

	.el-button.bor-0::after {
		border: 0 !important;
	}


	.el-button--medium {
		padding: 10rpx 20rpx !important;
		font-size: 18rpx !important;
		border-radius: 4rpx !important;
		height: 44rpx !important;
		box-sizing: border-box;
		align-items: center;
		display: flex;
	}

	.el-button--small {
		padding: 9rpx 15rpx !important;
		font-size: 17rpx !important;
		border-radius: 3rpx !important;
		height: 40rpx !important;
		box-sizing: border-box;
		align-items: center;
		display: flex;
	}

	.el-button--mini {
		padding: 7rpx 15rpx !important;
		font-size: 16rpx !important;
		border-radius: 3rpx !important;
		height: 36rpx !important;
		box-sizing: border-box;
		align-items: center;
		display: flex;
	}


	.border-width0,
	.bor-0 {
		border-top-width: 0 !important;
		border-bottom-width: 0 !important;
		border-left-width: 0 !important;
		border-right-width: 0 !important;
	}

	.font-size20,
	.fs20 {
		font-size: 20rpx;
	}

	.successcolor,
	.c-s {
		color: #67c23a !important;
	}

	.warningcolor,
	.c-w {
		color: #e6a23c !important;
	}

	.dangercolor,
	.c-d {
		color: #f56c6c !important;
	}

	.primarycolor,
	.c-p {
		color: #409eff !important;
	}

	.transparentbgcolor1,
	.b-t {
		background-color: transparent !important;
	}

	.margin-left10,
	.m-l10 {
		margin-left: 10rpx;
	}
</style>
