<template>
	<div class="page-body">
		<div class="header">
			<div class="score">分数: {{ score }}</div>
			<div class="btn_group" v-if="status === 2">
				<div class="btn" @click="stop">
					暂停
				</div>
			</div>
		</div>
		<div class="content_btn_group" v-if="status === 1 || status === 3">
			<div class="btn" @click="start">
				开始游戏
			</div>
		</div>
		<div class="movable-area">
			<div class="main">
				<div v-for="(item, index) in peerList" :key="index" class="peer"
					:style="{ position: 'absolute', top: item.y + 'px', left: item.x + 'px' }">
					<img v-if="item.status === 1" mode="widthFix" src="./static/enemy2_fly_1.png" />
					<img v-if="item.status === 2" mode="widthFix" src="./static/blast.gif" />
				</div>
				<div v-for="(item, index) in bulletList" :key="index" class="bullet"
					:style="{ position: 'absolute', top: item.y + 'px', left: item.x + 'px' }">
					<img :mode="widthFixMode" src="./static/bullet1.png" />
				</div>
			</div>
			<div :style="{ position: 'absolute', bottom: 0, left: old.x + 'px', top: old.y + 'px' }"
				:disabled="status === 1" @mousemove="onChange" @touchmove="onChange">
				<img v-if="status!== 3" :class="myplaneClass" mode="widthFix" src="./static/myplane.gif" />
				<img v-if="status === 3" :class="myplaneClass" mode="widthFix" src="./static/meblast.gif" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watchEffect
	} from 'vue';

	// 定义响应式数据
	const score = ref(0);
	const bulletList = ref([]);
	const peerList = ref([]);
	const x = ref(0);
	const y = ref(0);
	const scale = ref(2);
	const old = ref({
		x: 0,
		y: 0,
		scale: 2
	});
	const createBulletTime = ref(null);
	const bulletMoveTime = ref(null);
	const peerMoveTime = ref(null);
	const createPeerTime = ref(null);
	const claerPeerTime = ref(null);
	const plane = ref({
		width: 0,
		height: 0
	});
	const status = ref(1);

	const widthFixMode = 'widthFix';
	const enemyFlyImage = './static/enemy2_fly_1.png';
	const blastImage = './static/blast.gif';
	const bulletImage = './static/bullet1.png';
	const myplaneImage = './static/myplane.gif';
	const meblastImage = './static/meblast.gif';
	const myplaneClass = 'myplane';

	const rpxToPx = (rpx) => Math.floor(uni.upx2px(rpx));

	// 初始化方法
	const init = () => {
		const windowWidth = uni.getSystemInfoSync().windowWidth;
		const windowHeight = uni.getSystemInfoSync().windowHeight;
		old.value.x = windowWidth / 2 - rpxToPx(150 / 2);
		old.value.y = windowHeight;
		bulletList.value = [];
		peerList.value = [];
		score.value = 0;
		plane.value.width = rpxToPx(150);
		plane.value.height = rpxToPx(180);
	};

	// 对方战机移动
	const peerMove = () => {
		const height = uni.getSystemInfoSync().windowHeight;
		peerList.value.forEach((item) => {
			item.y += 1;
			if (item.y >= height) {
				item.status = 3;
			}
		});
	};

	// 清除阵亡战机
	const claerPeer = () => {
		peerList.value = peerList.value.filter((item) => item.status !== 3);
	};

	// 判断是否撞机
	const checkCrashPeer = () => {
		const x = old.value.x;
		const y = old.value.y;
		const width = plane.value.width;
		const height = plane.value.height;
		peerList.value.forEach((item) => {
			if (item.status === 1) {
				if (x >= item.x - width && x <= item.x + width) {
					if (y >= item.y - height * 2 && y <= item.y + height) {
						status.value = 3;
						item.status = 2;
						stop();
					}
				}
			}
		});
	};

	// 创建战机
	const createPeer = () => {
		const width = plane.value.width;
		const height = plane.value.height;
		const peer = {
			x: Math.floor(Math.random() * uni.getSystemInfoSync().windowWidth),
			y: -height,
			status: 1
		};
		peerList.value.push(peer);
	};

	// 开始游戏
	const start = () => {
		if (status.value === 3) {
			init();
		}
		if (status.value === 2) {
			uni.showToast({
				title: '游戏已开始',
				icon: 'none'
			});
			return;
		}
		status.value = 2;
		createBulletTime.value = setInterval(() => createBullet(), 100);
		bulletMoveTime.value = setInterval(() => bulletMove(), 10);
		createPeerTime.value = setInterval(() => createPeer(), 1000);
		peerMoveTime.value = setInterval(() => peerMove(), 10);
		claerPeerTime.value = setInterval(() => claerPeer(), 100);
	};

	// 暂停游戏
	const stop = () => {
		if (status.value !== 3) {
			status.value = 1;
		}
		clearInterval(createBulletTime.value);
		clearInterval(bulletMoveTime.value);
		clearInterval(peerMoveTime.value);
		clearInterval(createPeerTime.value);
		clearInterval(claerPeerTime.value);
	};

	// 判断子弹是否打中对方
	const checkBulletPeer = (x, y) => {
		const width = plane.value.width;
		const height = plane.value.height;
		peerList.value.forEach((item) => {
			if (item.status === 1) {
				if (x >= item.x && x <= item.x + width) {
					if (y >= item.y && y <= item.y + height) {
						item.status = 2;
						score.value++;
						setTimeout(() => {
							item.status = 3;
						}, 500);
					}
				}
			}
		});
	};

	// 子弹移动
	const bulletMove = () => {
		bulletList.value.forEach((item) => {
			item.y -= 10;
			checkBulletPeer(item.x, item.y);
			if (item.y < 0) {
				const index = bulletList.value.indexOf(item);
				if (index !== -1) {
					bulletList.value.splice(index, 1);
				}
			}
		});
	};

	// 创建子弹
	const createBullet = () => {
		const width = plane.value.width;
		const height = plane.value.height;
		const newBullet = {
			x: old.value.x + width / 2,
			y: old.value.y - height / 2
		};
		bulletList.value.push(newBullet);
	};

	// 我方战机移动
	const onChange = (e) => {
		old.value.x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		old.value.y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
		checkCrashPeer();
	};

	onMounted(() => {
		init();
	});

	watchEffect(() => {
		checkCrashPeer();
	});
</script>

<style lang="scss">
	.page-body {}

	.content_btn_group {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		bottom: 0;
		z-index: 1;

		.btn {
			border: 1px solid #666;
			color: #000;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
		}
	}

	.header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.score {
		color: #000;
		font-size: 30rpx;
		text-align: center;
	}

	.btn_group {
		display: flex;
		flex-direction: row;

		.btn {
			border: 1px solid #666;
			color: #000;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
		}
	}

	.movable-area {
		background: url('./static/background_1.png');
		position: fixed;
		height: 750rpx;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		bottom: 0;
		height: 100%;
		overflow: hidden;
	}

	.main {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bullet {
		position: absolute;
		width: 10rpx;

		img {
			width: 10rpx;
		}
	}

	.peer {
		height: 180rpx;
		width: 150rpx;

		img {
			height: 180rpx;
			width: 150rpx;
		}
	}

	.myplane {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 180rpx;
		width: 150rpx;
		color: #fff;
		position: absolute;
		bottom: 0;
	}
</style>