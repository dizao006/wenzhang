<template>
	<view class="account-page">
		<!-- 顶部背景图 -->
		<image class="header-bg" :src="store.state.userInfo.avatar" mode="aspectFill"></image>

		<!-- 用户信息 -->
		<view class="user-info">
			<image class="avatar" :src="store.state.userInfo.avatar" mode="aspectFill"></image>
			<text class="username">{{ store.state.userInfo.author_name }}</text>
		</view>

		<!-- 余额卡片 -->
		<view class="balance-card">
			<image class="card-bg" :src="store.state.userInfo.avatar" mode="aspectFill"></image>
			<view class="card-content">
				<text class="balance-label">当前积分</text>
				<text class="balance-amount">{{ store.state.userInfo.integral_count }}</text>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="function-list">
			<uni-list>
				<view @click="showRechargePopup">
					<uni-list-item title="充值" show-arrow />
				</view>
				<view class="" @click="showWithdrawPopup">
					<uni-list-item title="提现" show-arrow />
				</view>

				<view @click="goGift">
					<uni-list-item title="消费" show-arrow />
				</view>
			</uni-list>
		</view>

		<!-- 充值弹窗 -->
		<uni-popup ref="rechargePopup" type="bottom">
			<view class="popup-content">
				<text class="popup-title">充值</text>
				<view class="preset-amounts">
					<button class="preset-button" @click="setRechargeAmount(1)">1 元</button>
					<button class="preset-button" @click="setRechargeAmount(5)">5 元</button>
					<button class="preset-button" @click="setRechargeAmount(10)">10 元</button>
					<button class="preset-button" @click="setRechargeAmount(50)">50 元</button>
					<button class="preset-button" @click="setRechargeAmount(100)">100 元</button>
				</view>
				<input class="popup-input" type="number" v-model="rechargeAmount" placeholder="请输入充值金额" />
				<button class="popup-button confirm" @click="recharge">确认充值</button>
				<button class="popup-button cancel" @click="closeRechargePopup">取消</button>
			</view>
		</uni-popup>

		<!-- 提现弹窗 -->
		<uni-popup ref="withdrawPopup" type="bottom">
			<view class="popup-content">
				<text class="popup-title">提现</text>
				<view class="preset-amounts">
					<button class="preset-button" @click="setWithdrawAmount(1)">1 元</button>
					<button class="preset-button" @click="setWithdrawAmount(5)">5 元</button>
					<button class="preset-button" @click="setWithdrawAmount(10)">10 元</button>
					<button class="preset-button" @click="setWithdrawAmount(50)">50 元</button>
					<button class="preset-button" @click="setWithdrawAmount(100)">100 元</button>
				</view>
				<input class="popup-input" type="number" v-model="withdrawAmount" placeholder="请输入提现金额" />
				<button class="popup-button confirm" @click="withdraw">确认提现</button>
				<button class="popup-button cancel" @click="closeWithdrawPopup">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		useStore
	} from "vuex";
	import {
		addIntegrl_count
	} from "@/ajax/api/interface/addIntegrl_count.js"
	const store = useStore();

	// 弹窗引用
	const rechargePopup = ref(null);
	const withdrawPopup = ref(null);

	// 充值金额和提现金额
	const rechargeAmount = ref(0);
	const withdrawAmount = ref(0);

	// 显示充值弹窗
	function showRechargePopup() {
		rechargePopup.value.open();
		document.body.style.overflow = 'hidden'; // 防止滚动穿透
	}

	// 关闭充值弹窗
	function closeRechargePopup() {
		rechargePopup.value.close();
		document.body.style.overflow = 'auto'; // 恢复滚动
		rechargeAmount.value = 0;
	}

	// 显示提现弹窗
	function showWithdrawPopup() {
		withdrawPopup.value.open();
		document.body.style.overflow = 'hidden'; // 防止滚动穿透
	}

	// 关闭提现弹窗
	function closeWithdrawPopup() {
		withdrawPopup.value.close();
		document.body.style.overflow = 'auto'; // 恢复滚动
		withdrawAmount.value = 0;
	}

	// 设置预设充值金额
	function setRechargeAmount(amount) {
		rechargeAmount.value = amount;
	}

	// 设置预设提现金额
	function setWithdrawAmount(amount) {
		withdrawAmount.value = amount;
	}

	// 充值逻辑
	async function recharge() {
		if (rechargeAmount.value <= 0) {
			uni.showToast({
				title: "请输入有效金额",
				icon: "none",
			});
			return;
		}
		// 这里调用充值接口
		console.log("充值金额:", {
			id: store.state.userInfo._id,
			count: rechargeAmount.value
		});
		let res = await addIntegrl_count({
			id: store.state.userInfo._id,
			count: rechargeAmount.value
		})
		if (res.code == 0) {
			uni.showToast({
				title: res.msg,
				icon: 'success'
			})
		}
		store.commit('updateUserInfo', res.result)
		closeRechargePopup();
	}

	// 提现逻辑
	async function withdraw() {
		if (withdrawAmount.value <= 0) {
			uni.showToast({
				title: "请输入有效金额",
				icon: "none",
			});
			return;
		}
		const currentBalance = parseFloat(store.state.userInfo.integral_count);
		if (withdrawAmount.value > currentBalance) {
			uni.showToast({
				title: "余额不足，无法提现",
				icon: "none",
			});
			return;
		}
		// 这里调用提现接口
		let res = await addIntegrl_count({
			id: store.state.userInfo._id,
			count: -withdrawAmount.value
		})
		if (res.code == 0) {
			uni.showToast({
				title: res.msg,
				icon: 'success'
			})
		}
		store.commit('updateUserInfo', res.result)
		closeWithdrawPopup();
	}

	// 跳转到消费页面
	function goGift() {
		uni.navigateTo({
			url: "/pages/gift/gift",
		});
	}
</script>

<style scoped>
	.account-page {
		padding: 0;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	.header-bg {
		width: 100%;
		height: 200px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.user-info {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 120px;
		margin-bottom: 20px;
	}

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 3px solid #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.username {
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		margin-top: 10px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.balance-card {
		position: relative;
		background-color: #fff;
		border-radius: 15px;
		margin: 20px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.card-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.8;
	}

	.card-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	.balance-label {
		font-size: 16px;
		color: #666;
		margin-bottom: 10px;
	}

	.balance-amount {
		font-size: 28px;
		font-weight: bold;
		color: #333;
	}

	.function-list {
		background-color: #fff;
		border-radius: 15px;
		margin: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.popup-content {
		background: linear-gradient(135deg, #f9f9f9, #e9e9e9);
		/* 渐变色背景 */
		padding: 30px;
		border-radius: 20px;
		width: 100%;
		max-width: 400px;
		text-align: center;
		box-sizing: border-box;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
		animation: fadeIn 0.3s ease;
		/* 淡入动画 */
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.popup-title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #333;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.preset-amounts {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 20px;
	}

	.preset-button {
		width: 80px;
		height: 35px;
		background-color: #e0e0e0;
		color: #333;
		border: none;
		border-radius: 8px;
		margin: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.preset-button:hover {
		background-color: #d0d0d0;
		transform: translateY(-2px);
	}

	.popup-input {
		width: 100%;
		height: 40px;
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 0 10px;
		margin-bottom: 20px;
		box-sizing: border-box;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		transition: border-color 0.2s ease;
	}

	.popup-input:focus {
		border-color: #007aff;
		outline: none;
	}

	.popup-button {
		width: 100%;
		height: 40px;
		border-radius: 8px;
		margin-bottom: 10px;
		box-sizing: border-box;
		font-weight: bold;
		transition: all 0.2s ease;
	}

	.popup-button.confirm {
		background: linear-gradient(135deg, #007aff, #0056b3);
		/* 渐变色按钮 */
		color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.popup-button.confirm:hover {
		background: linear-gradient(135deg, #0056b3, #003d82);
		transform: translateY(-2px);
	}

	.popup-button.cancel {
		background-color: #e0e0e0;
		color: #333;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.popup-button.cancel:hover {
		background-color: #d0d0d0;
		transform: translateY(-2px);
	}
</style>