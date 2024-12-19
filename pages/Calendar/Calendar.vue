<template>
	<view class="calendar-content" v-if="showCalendar">
		<uni-section title="插入模式" type="line"></uni-section>
		<view>
			<!-- 插入模式 -->
			<uni-calendar showMonth lunar class="uni-calendar--hook" :selected="selected" @change="changehandle" />
		</view>
	</view>
	<view class="bottom">
		<span style="margin-bottom: 30rpx;">我的任务</span>
		<view class="mesg">
			<view class="item">
				<uni-icons size="45px" color="blue" type="flag"></uni-icons>
				<view class="text">
					<view class="tx">
						今日签到:{{date.fullDate}}
						<uni-icons size="15px" color="blue" type="fire"></uni-icons>
					</view>

					<span style="margin-top:15rpx ;font-size: 13px; color:rgb(153 146 146)">奖励积分 10</span>
				</view>
				<button class="but" disabled="true">已完成</button>
			</view>
			<view class="item">
				<uni-icons size="45px" color="blue" type="calendar"></uni-icons>
				<view class="text">
					<view class="tx">
						发布一篇文章
						<uni-icons size="15px" color="blue" type="fire"></uni-icons>
					</view>

					<span style="margin-top:15rpx ;font-size: 13px; color:rgb(153 146 146)">奖励积分 10</span>
				</view>
				<button class="but" disabled="true">已完成</button>
			</view>
		</view>
		<view class="texts">
			用户协议--法律声明 @缔造掘金
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick,
		reactive,
		onBeforeMount
	} from 'vue';
	import {
		useStore
	} from "vuex"
	import {
		getSelected
	} from "@/ajax/api/interface/getSelected.js"
	import {
		addSelected
	} from "@/ajax/api/interface/addSelected.js"
	// 获取任意时间
	const state = useStore()
	let userId = state.state.userInfo._id

	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date();
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/');
		}
		const dd = new Date(date);

		dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

		const y = dd.getFullYear();
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		};
	}

	// 响应式数据定义
	const showCalendar = ref(false);
	const info = ref({
		lunar: true,
		range: true,
		insert: false,
	});
	let selected = reactive([])
	const date = getDate()
	// 模拟异步获取数据
	onMounted(async () => {
		// 假设设置初始选中的打卡日期为今天（通过getDate获取当前日期填充）
		const initialSelectedDate = getDate(new Date());
		const datas = await getSelected({
			userId
		})
		selected.push(...datas.data)
		const data = {
			date: initialSelectedDate.fullDate,
			info: '打卡',
		}
		if (JSON.stringify(selected[selected.length - 1]) !== JSON.stringify(data)) {
			selected.push(data);
			state.commit('addSelected', data)
			await addSelected({
				userId,
				data
			})
			setTimeout(() => {
				uni.showToast({
					title: "签到成功",
					icon: 'success'
				})
			}, 500)

		}
		showCalendar.value = true;
	});
</script>

<style lang="scss">
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}

	.bottom {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 20rpx;

		.mesg {
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				justify-content: space-evenly;
				height: 150rpx;

				.text {
					display: flex;
					flex-direction: column;
					width: 180px;
					margin-left: 40rpx;
				}

				.but {
					// width: 60rpx;
					font-size: 14px;
					height: 60rpx;
					border-radius: 100px;
					line-height: 60rpx;
					transform: translate(20rpx, 10rpx);
					background: #abcdff;
					color: #fff;
				}
			}
		}

		.texts {
			font-size: 12px;
			text-align: center;
			color: rgb(153 146 146);
		}
	}
</style>