<template>
	<view class="login-container">
		<image class="banner-bg" src="../../../static/img/login_bg.png" mode=""></image>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" @click="changeType1" :class="type=='account'?'active':''">
				账号登录
			</view>
			<view class="nav-item" @click="changeType2" :class="type!='account'?'active':''">
				手机登录
			</view>
		</view>
		<!-- 表单 -->
		<uni-forms class="form" ref="form" :modelValue="fromData" :rules="userRules">
			<view class="" v-if="type=='account'">
				<uni-forms-item label='账号' name='loginName'>
					<input type="text" placeholder="请输入账号" placeholder-class="placeholder" class="form-input"
						v-model="fromData.loginName" />
				</uni-forms-item>
				<uni-forms-item label='密码' name='password'>
					<input type="password" placeholder="请输入密码" placeholder-class="placeholder" class="form-input"
						v-model="fromData.password" />
				</uni-forms-item>
			</view>
			<view class="" v-else>
				<uni-forms-item label='手机号' name='phone'>
					<input type="number" placeholder="请输入手机号" placeholder-class="placeholder" class="form-input"
						v-model="fromData.phone" />
				</uni-forms-item>
				<uni-forms-item name='vCode' label="验证码">
					<input type="number" maxlength="6" label='验证码' placeholder="请输入验证码" placeholder-class="placeholder"
						class="form-input" v-model="fromData.vCode" />
				</uni-forms-item>
			</view>
			<SendCode :form='form' :sendCodeData="sendCodeData" v-if="type=='phone'"></SendCode>
			<button class="login-btn" @click=" login">点击登录</button>
		</uni-forms>
		<view class="footer-select">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		user_login
	} from "@/ajax/api/user_login/user_login.js"
	import {
		useStore
	} from 'vuex';
	import {
		phone
	} from '../../../ajax/api/user_login/phone';
	const store = useStore(); // 使用 useStore 获取 store 实例
	let fromData = ref({
		loginName: '',
		password: '',
		phone: '',
		vCode: ''
	})
	let userRules = {
		loginName: {
			rules: [{
					required: true,
					errorMessage: '用户名不能为空',
				},
				{
					validateFunction: SetloginName
				}
			]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '密码不能为空',
			}, {
				validateFunction: SetPassword
			}]
		},
		phone: {
			rules: [{
				required: true,
				errorMessage: '手机号不能为空',
			}, {
				validateFunction: SetPhone
			}]
		},
		vCode: {
			rules: [{
				required: true,
				errorMessage: '验证码不能为空',
			}, {
				validateFunction: SetVcode
			}]
		}
	}
	let type = ref('account')
	let form = ref()
	let PhoneCode = ref()

	function changeType1() {
		type.value = 'account'
		fromData.value.phone = ''
		fromData.value.vCode = ''
	}

	function changeType2() {
		type.value = 'phone'
		fromData.value.loginName = ''
		fromData.value.password = ''
	}

	async function login() {
		// console.log('登录', form.value);
		let res = await form.value.validate()
		if (res.vCode && res.vCode != PhoneCode.value) {
			uni.showToast({
				title: "验证码错误",
				icon: 'none'
			});
			return
		}
		// 验证登录
		submit({
			type: type.value,
			...res
		})
	}

	function sendCodeData(data) {
		console.log(data)
		PhoneCode.value = data
	}


	/**
	 * @param {Object} formData 登录方法
	 */
	async function submit(formData) {
		const userInfo = await user_login(formData);
		if (userInfo) {
			// 使用 store.commit 来提交 mutation
			store.commit('updateUserInfo', userInfo);
			uni.showToast({
				title: "登陆成功",
				icon: 'none'
			});
			setTimeout(() => {
				uni.navigateBack();
			}, 1000);
		} else {
			uni.showToast({
				title: "账号或者密码错误",
				icon: 'none'
			});
		}
	}


	function SetloginName(rule, val, data, callback) {
		switch (true) {
			case val.length < 6:
				callback('用户名长度不得小于六位')
			default:
				return true
		}
	}

	function SetPassword(rule, val, data, callback) {
		switch (true) {
			case val.length < 6:
				callback('密码长度不得小于六位')
			default:
				return true
		}
	}

	function SetPhone(rule, val, data, callback) {
		let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
		switch (true) {
			case !reg.test(val):
				callback('手机号格式不正确')
			default:
				return true
		}
	}

	function SetVcode(rule, val, data, callback) {
		return true
	}
</script>
<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}
</style>

<style lang="scss" scoped>
	@import "./css/login.scss"
</style>