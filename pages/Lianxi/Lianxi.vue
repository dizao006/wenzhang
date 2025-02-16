<template>
	<view class="container">
		<!-- 产品信息 -->
		<view class="product-info">
			<text class="section-title">产品信息</text>
			<text class="product-desc">
				这是一款功能强大且独具特色的文章分享与交流平台，汇聚海量优质文章资源，涵盖多领域前沿知识与深度见解。在这里，您不仅能汲取先进的行业理念、前沿的学术研究成果，还能与志同道合的伙伴互动交流。通过思维碰撞，拓宽视野，快速掌握高效的学习和工作方法，全方位提升个人效率
				，开启知识获取与交流的全新旅程。
			</text>
		</view>

		<!-- 联系方式 -->
		<view class="contact-info">
			<text class="section-title">联系方式：</text>
			<view class="contact-item">
				<image src="https://img.icons8.com/ios/50/000000/map-marker.png" class="contact-icon"
					mode="aspectFill" />
				<text>地址：XX省XX市XX区XX街道XX号</text>
			</view>
			<view class="contact-item">
				<image src="https://img.icons8.com/ios/50/000000/email-open.png" class="contact-icon"
					mode="aspectFill" />
				<text>邮箱：xxxx@example.com</text>
			</view>
			<view class="contact-item">
				<image src="https://img.icons8.com/ios/50/000000/phone.png" class="contact-icon" mode="aspectFill" />
				<text>电话：123-4567-8900</text>
			</view>
		</view>

		<!-- 表单 -->
		<view class="form-section">
			<text class="section-title">给我们留言</text>
			<form @submit.prevent="submitForm">
				<view class="form-item">
					<label>姓名：</label>
					<input type="text" v-model="formData.name" placeholder="请输入您的姓名" />
				</view>
				<view class="form-item">
					<label>邮箱：</label>
					<input type="email" v-model="formData.email" placeholder="请输入您的邮箱地址" />
				</view>
				<view class="form-item">
					<label>内容：</label>
					<textarea v-model="formData.content" placeholder="请输入您的留言内容"></textarea>
				</view>
				<button formtype="submit" class="submit-button">提交</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					email: '',
					content: ''
				}
			};
		},
		methods: {
			submitForm() {
				console.log('提交的数据:', this.formData);
				// 这里可以添加实际提交表单数据的逻辑，比如调用接口发送数据
			}
		}
	};
</script>

<style scoped>
	.container {
		padding: 30rpx;
		background-color: #f4f4f4;
	}

	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 25rpx;
		color: #333;
		text-align: center;
	}

	.product-info {
		margin-bottom: 50rpx;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.product-desc {
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
		text-align: justify;
	}

	.contact-info {
		margin-bottom: 50rpx;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.contact-item {
		display: flex;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 28rpx;
		color: #333;
	}

	.contact-icon {
		width: 80rpx;
		height: 80rpx;
		margin-right: 30rpx;
	}

	.form-section {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.form-item {
		margin-bottom: 35rpx;
	}

	.form-item label {
		display: block;
		margin-bottom: 15rpx;
		font-size: 30rpx;
		color: #333;
	}

	.form-item input {
		width: 100%;
		max-width: 600px;
		font-size: 16px;
		padding: 1px;
		border: 1px solid #ccc;
		border-radius: 12rpx;
		display: block;
	}

	.form-item textarea {
		width: 100%;
		max-width: 600px;
		padding: 20rpx;
		border: 1px solid #ccc;
		border-radius: 12rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		margin: 0 auto;
		display: block;
	}

	.submit-button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 15rpx 30rpx;
		border-radius: 25rpx;
		font-size: 28rpx;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: block;
		margin: 0 auto;
	}

	.submit-button:hover {
		background-color: #0056b3;
	}
</style>