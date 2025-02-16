<template>
	<view class="container">
		<!-- 顶部英雄区 -->
		<view class="hero-section">
			<image src="https://wallpaperaccess.com/full/2569597.jpg" class="hero-img" mode="aspectFill"></image>
			<view class="hero-content">
				<text class="hero-title">开启非凡体验，畅享无限可能</text>
				<text class="hero-subtitle">欢迎来到我们精心打造的产品世界，这里有超乎想象的精彩等您探索</text>
				<!-- <button class="hero-button" @click="goToProduct">立即体验</button> -->
			</view>
		</view>

		<!-- 产品亮点区 -->
		<view class="feature-section">
			<text class="section-title">卓越亮点，独树一帜</text>
			<view class="feature-wrapper">
				<view class="feature-item">
					<image src="https://img.icons8.com/ios-filled/50/000000/settings.png" class="feature-icon"
						mode="aspectFill"></image>
					<text class="feature-title">功能丰富多样</text>
					<text
						class="feature-desc">我们的产品汇聚了众多实用且强大的功能，无论是日常办公、学习研究，还是休闲娱乐，都能一站式满足您的多样需求，成为您生活和工作的得力助手。</text>
				</view>
				<view class="feature-item">
					<image src="https://img.icons8.com/ios-filled/50/000000/light-bulb.png" class="feature-icon"
						mode="aspectFill"></image>
					<text class="feature-title">创新引领潮流</text>
					<text
						class="feature-desc">秉持创新精神，不断突破传统。我们的产品融入了前沿的理念和独特的设计，为您带来前所未有的全新体验，让您在使用过程中感受科技与创意的完美融合。</text>
				</view>
				<view class="feature-item">
					<image src="https://img.icons8.com/ios-filled/50/000000/security-shield.png" class="feature-icon"
						mode="aspectFill"></image>
					<text class="feature-title">安全保驾护航</text>
					<text
						class="feature-desc">深知您对数据安全的重视，我们采用了先进的加密技术和严格的安全防护措施，全方位保障您的数据安全与隐私，让您使用无忧，放心享受产品带来的便捷。</text>
				</view>
			</view>
		</view>

		<!-- 积分奖励区 -->
		<view class="reward-section">
			<text class="section-title">丰厚积分，惊喜不断</text>
			<view class="reward-wrapper">
				<view class="reward-item">
					<image src="https://img.icons8.com/ios/50/000000/group-add.png" class="reward-icon"
						mode="aspectFill"></image>
					<view class="reward-detail">
						<text class="reward-title">邀请好友，共享积分盛宴</text>
						<text class="reward-desc">每成功邀请一位好友使用我们的产品，您即可轻松获得100积分。与好友一同开启精彩之旅，还能收获丰厚奖励，何乐而不为？</text>
					</view>
				</view>
				<view class="reward-item">
					<image src="https://img.icons8.com/ios/50/000000/calendar-check.png" class="reward-icon"
						mode="aspectFill"></image>
					<view class="reward-detail">
						<text class="reward-title">每日签到，积分轻松到手</text>
						<text class="reward-desc">坚持每日签到，养成良好习惯的同时，还能每天获得20积分。小小的举动，积累大大的惊喜，积分福利等你来拿。</text>
					</view>
				</view>
				<view class="reward-item">
					<image src="https://img.icons8.com/ios/50/000000/trophy.png" class="reward-icon" mode="aspectFill">
					</image>
					<view class="reward-detail">
						<text class="reward-title">完成任务，赢取高额积分</text>
						<text class="reward-desc">积极参与并完成我们精心设计的指定任务，最高可获得500积分。挑战自我，解锁更多积分成就，兑换心仪好礼。</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 用户评价区 -->
		<view class="testimonial-section">
			<text class="section-title">用户心声，品质见证</text>
			<view class="testimonial-wrapper">
				<view class="testimonial-item">
					<image src="https://randomuser.me/api/portraits/men/1.jpg" class="testimonial-avatar"
						mode="aspectFill"></image>
					<text class="testimonial-content">"使用这款产品后，我的工作效率大幅提升，功能太强大了，真的离不开它！"-李明</text>
				</view>
				<view class="testimonial-item">
					<image src="https://randomuser.me/api/portraits/women/2.jpg" class="testimonial-avatar"
						mode="aspectFill"></image>
					<text class="testimonial-content">"界面简洁，操作方便，而且积分活动很有趣，让我更有动力使用了。"-王丽</text>
				</view>
			</view>
		</view>

		<!-- 常见问题区 -->
		<view class="faq-section">
			<text class="section-title">常见问题，为您解答</text>
			<view class="faq-item">
				<text class="faq-question">积分可以兑换什么？</text>
				<text class="faq-answer">积分可用于兑换各类精美礼品、优惠券以及独家权益，具体兑换内容可在积分商城中查看。</text>
			</view>
			<view class="faq-item">
				<text class="faq-question">邀请好友的具体流程是什么？</text>
				<text class="faq-answer">在产品内找到“邀请好友”功能入口，点击后可通过分享链接或二维码邀请好友。好友成功注册并使用产品后，您即可获得积分。</text>
			</view>
		</view>

		<!-- 底部行动号召区 -->
		<view class="cta-section">
			<text class="cta-title">还在等什么？立即加入我们</text>
			<button class="gradient-button" @click="goToProduct">立即体验</button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goToProduct() {
				console.log('前往产品页面');
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: #f4f4f4;
		padding: 20rpx;
	}

	.hero-section {
		position: relative;
		overflow: hidden;
		border-radius: 15rpx;
		margin-bottom: 40rpx;
	}

	.hero-img {
		width: 100%;
		height: 400rpx;
		opacity: 0.7;
	}

	.hero-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: white;
	}

	.hero-title {
		font-size: 48rpx;
		font-weight: 800;
		margin-bottom: 20rpx;
		text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
		letter-spacing: 2px;
		line-height: 1.3;
	}

	.hero-subtitle {
		font-size: 32rpx;
		margin-bottom: 30rpx;
		text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
		letter-spacing: 1px;
	}

	.hero-button {
		background-color: #ff6600;
		color: white;
		border: none;
		border-radius: 25rpx;
		padding: 12rpx 30rpx;
		font-size: 30rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s ease-in-out;
	}

	.hero-button:hover {
		background-color: #e65800;
	}

	.section-title {
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 15rpx;
		margin-top: 15rpx;
		text-align: center;
		letter-spacing: 1px;
	}

	.feature-wrapper,
	.reward-wrapper,
	.testimonial-wrapper {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	.feature-item,
	.reward-item,
	.testimonial-item {
		background-color: white;
		border-radius: 15rpx;
		padding: 30rpx;
		display: flex;
		align-items: flex-start;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
	}

	.feature-icon,
	.reward-icon,
	.testimonial-avatar {
		width: 100rpx;
		height: 100rpx;
		margin-right: 30rpx;
	}

	.feature-title,
	.reward-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 15rpx;
		letter-spacing: 1px;
	}

	.feature-desc,
	.reward-desc,
	.testimonial-content {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}

	.faq-section {
		margin-bottom: 40rpx;
	}

	.faq-item {
		background-color: white;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
	}

	.faq-question {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 15rpx;
		letter-spacing: 1px;
	}

	.faq-answer {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}

	.cta-section {
		text-align: center;
		margin-top: 50rpx;
	}

	.cta-title {
		font-size: 36rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 20rpx;
		letter-spacing: 1px;
	}

	.gradient-button {
		width: 250rpx;
		height: 60rpx;
		border: none;
		border-radius: 30rpx;
		color: #fff;
		font-size: 32rpx;
		background: linear-gradient(to right, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
		cursor: pointer;
		outline: none;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s ease-in-out;
		line-height: 60rpx;
	}

	.gradient-button:hover {
		background: linear-gradient(to right, #ff6b6b 0%, #ffa07a 99%, #ffa07a 100%);
	}
</style>