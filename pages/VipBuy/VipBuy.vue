<template>
	<view class="container">
		<uni-section title="双标题卡片" type="line">
			<uni-card title="缔造掘金VIP会员" sub-title="年度会员专项五折优惠" extra=""
				thumbnail="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd3e238ee7f46eab42bf88af17f5528~tplv-k3u1fbpfcp-image.image"
				@click="onClick">
				<span style="font-size: 18px;">￥168/年</span> <span
					style="font-size: 12px;text-decoration: line-through">￥365</span>
				<span class="btn" @click="buy">点击购买</span>
			</uni-card>
		</uni-section>
		<view class="quanyi">
			<span style="font-weight:600;">专属权益</span>
			<view class="itemCon">
				<view class="item">
					<uni-icons type="cart" size="36" color="#666"></uni-icons>
					<span class="txt">全场七折</span>
				</view>
				<view class="item">
					<uni-icons type="color" size="36" color="#666"></uni-icons>
					<span class="txt">自定义颜色</span>
				</view>
				<view class="item">
					<uni-icons type="vip" size="36" color="#666"></uni-icons>
					<span class="txt">VIP身份标识</span>
				</view>
				<view class="item">
					<uni-icons type="bars" size="36" color="#666"></uni-icons>
					<span class="txt">内部课程</span>
				</view>
			</view>
		</view>
		<view class="bottomCon">
			<span
				style="color: #a99572;font-size: 24px;line-height: 40px; font-weight: 500; margin-top: 30rpx;">为什么选择缔造掘金?</span>
			<uni-icons type="down" size="22" color="#666"></uni-icons>
			<uni-icons style="margin-top: -30rpx;" type="down" size="22" color="#666"></uni-icons>
			<view class="new-vip-title-bottom" style="width: 126px; transform: translate(-110rpx,13rpx); ">
			</view>
			<span style="margin:15rpx 0 30rpx 0; color: #252933; font-size: 18px;">年度会员专项福利</span>
			<text
				style="font-size: 24rpx; color:rgb(73 69 69); margin:0 40rpx;">现在购买年度会员，可以免费学习一本价值79.9元的小册，并且任意选择一款缔造周边</text>
		</view>
		<view class="" style="margin-top: 80rpx; margin-right: 40rpx;">
			<view style="text-align: center;">
				<view class="new-vip-title-bottom" style="width: 126px; ">
				</view>
				<span style="margin:15rpx 0 30rpx 0; color: #252933; font-size: 18px;">内部课程免费学</span>
				<br />
				<text
					style="font-size: 24rpx; color:rgb(73 69 69);margin:0 40rpx;">字节内部优质技术课程，面向VIP会员陆续推出！零距离感受大厂人的工作与学习方式。会员期内可直接免费学习</text>
			</view>
			<Lbut></Lbut>
		</view>
		<view class="quanyi" style="margin-left: 60rpx;">
			<span
				style="margin:15rpx 0 10rpx 0; color: #252933; font-size: 18px; display: flex; justify-content: center;">全场七折优惠</span>
			<text style="font-size: 24rpx; color:rgb(73 69 69);margin:0 40rpx;">会员有效期内购买掘金小册，可享受全场7折优惠</text>
			<view class="bottom">
				<view style="width: 100%; text-align: center; font-size: 22px;">FAQ</view>
				<FAQVue></FAQVue>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Lbut from '../../components/Lbut/lbut/lbut.vue';
	import FAQVue from '../../components/FAQ/FAQ.vue';
	import {
		ref,
		reactive
	} from 'vue';

	function buy() {
		uni.showToast({
			title: "功能暂未开启",
			icon: "error"
		})
	}
</script>

<style scoped lang="scss">
	.container {
		overflow: hidden;

		.quanyi {
			margin-left: 20rpx;

			.itemCon {
				display: flex;
				justify-content: space-evenly;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-left: 15rpx;
					margin-top: 20rpx;

					.txt {
						font-size: 26rpx;
					}

				}
			}
		}
	}

	.bottomCon {
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;

		// justify-content: center;

	}

	.new-vip-title-bottom {
		height: 8px;
		bottom: 0px;
		background: linear-gradient(90deg, rgba(253, 232, 195, 0.2), #edd3a7);
		// width: 100%;
		position: relative;
		left: 50%;
		z-index: -1;
		transform: translate(-50%);
		top: 45rpx;
	}

	.bottom {
		margin-top: 60rpx;
		margin-left: -40rpx;
	}

	.btn {
		position: relative;
		right: -240rpx;
		color: #b1b1b1;
	}
</style>