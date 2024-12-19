<template>
	<view class="list-scroll-container">
		<scroll-view scroll-y="true" class="list-scroll">
			<view class="author-card" v-for="(item,index) in props.authorList" :key="item._id">
				<view class="author-image-container">
					<image :src="item.avatar?item.avatar : '../../static/img/info.jpg'" alt="" />
				</view>
				<view class="author-desc-container">
					<view class="author-info">
						{{item. author_name}}
					</view>
					<view class="author-info-bottom">
						<view class="info-left">
							{{item.professional}}
						</view>
						<view class="info-right">
							<view class="desc">
								发帖:{{item.article_ids.length}}
							</view>
							<view class="desc">
								粉丝：{{item.fans_count}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	const props = defineProps({
		authorList: Array
	})
</script>

<style lang="scss" scoped>
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			height: 100%;
		}

		.author-card {
			@include flex(flex-start);
			align-items: flex-start;
			border-bottom: 1px solid #f5f5f5;
			padding: 20rpx 0;
			margin: 0 20rpx;
			box-sizing: border-box;

			.author-image-container {
				flex-shrink: 0;
				width: 80rpx;
				height: 80rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.author-desc-container {
				flex-grow: 1;
				@include flex(space-between, column);
				align-items: flex-start;
				padding-left: 20rpx;
				height: 80rpx;

				.author-info {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
					line-height: 1.2
				}

				.author-info-bottom {
					@include flex();
					width: 100%;
					line-height: 1.5;
					font-size: 24rpx;
					color: #666;

					.info-right {
						@include flex(flex-start);

						.desc {
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
</style>