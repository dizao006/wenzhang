<template>
	<view class="code-container">
		<view class="vCode-btn" @click="sendCode">
			{{!staus?'获取验证码':`${time}后重新获取`}}
		</view>
	</view>
</template>

<script setup>
	import {
		onUnmounted,
		ref
	} from 'vue';
	let {
		form,
		sendCodeData
	} = defineProps(['form', 'sendCodeData'])
	import {
		phone as getCode
	} from "@/ajax/api/user_login/phone.js"
	onUnmounted(() => {
		clearInterval(timeId.value)
		time.value = 6
		timeId.value = null
		staus.value = false
	})
	let timeId = ref(null)
	let time = ref(6)
	let staus = ref(false)
	async function sendCode() {
		const {
			phone
		} = await form.validateField(['phone']) //验证手机号格式是否正确
		if (!staus.value) {
			timeEnd()
		}
		//发送数据请求云函数
		const res = await getCode({
			phone
		})
		uni.showToast({
			title: "发送成功，请注意查收验证码",
			icon: 'none'
		});
		sendCodeData(res)
	}

	function timeEnd() {
		console.log(time.value)
		staus.value = true
		timeId.value = setInterval(() => {
			if (time.value == 1) {
				clearInterval(timeId.value)
				time.value = 6
				timeId.value = null
				staus.value = false
				return
			}
			time.value--
			console.log(time.value)
		}, 1000)
	}
</script>

<style lang="scss">
	.code-container {
		flex-shrink: 0;
		position: absolute;
		width: 230rpx;
		text-align: center;
		top: 630rpx;
		transform: translate(260px);

		.vCode-btn {
			background-color: $base-color;
			color: #FFFFFF;
			padding: 15rpx;
			border-radius: 10rpx;
			opacity: .8;

		}
	}
</style>