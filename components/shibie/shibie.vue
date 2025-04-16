<template>
	<view class="container">
		<button @click="toggleRecording" :disabled="loading">
			{{ isRecording ? '停止录音' : '开始录音' }}
		</button>
		<view class="result">识别结果：{{ transcript }}</view>
		<view v-if="loading" class="loading">加载中...</view>
		<view v-if="error" class="error">{{ error }}</view>
	</view>
</template>

<script>
	// 修复方案1：使用兼容性导入方式
	let Vosk;

	export default {
		data() {
			return {
				isRecording: false,
				transcript: '',
				loading: false,
				error: '',
				recognizer: null,
				audioContext: null,
				mediaStream: null
			}
		},
		async created() {
			// 动态导入Vosk库
			try {
				Vosk = await import('vosk-browser');
				// 修复方案2：检查不同版本的导出方式
				if (!Vosk.createVoskRecognizer && Vosk.default) {
					Vosk = Vosk.default;
				}
				window.Buffer = window.Buffer || (await import('buffer')).Buffer;
			} catch (e) {
				this.error = `加载语音模块失败: ${e.message}`;
				console.error(e);
			}
		},
		methods: {
			async toggleRecording() {
				if (this.isRecording) {
					await this.stopRecording();
				} else {
					await this.startRecording();
				}
			},

			async startRecording() {
				try {
					this.loading = true;
					this.error = '';

					// 修复方案3：使用新的API调用方式
					if (!this.recognizer) {
						// 重要：检查Vosk是否已正确加载
						if (!Vosk || !Vosk.createVoskRecognizer) {
							throw new Error('语音识别模块未正确初始化');
						}

						// 新版调用方式
						const model = await Vosk.createVoskRecognizer({
							modelUrl: '/static/vosk-model/zh-cn',
							proxyWorker: true
						});

						this.recognizer = new model.KaldiRecognizer();
						this.recognizer.on('result', (message) => {
							const result = JSON.parse(message);
							this.transcript = result.text;
						});
					}

					// 初始化音频
					this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
					this.mediaStream = await navigator.mediaDevices.getUserMedia({
						audio: true
					});
					const source = this.audioContext.createMediaStreamSource(this.mediaStream);

					const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
					processor.onaudioprocess = (e) => {
						this.recognizer?.acceptWaveform(e.inputBuffer);
					};

					source.connect(processor);
					processor.connect(this.audioContext.destination);

					this.isRecording = true;
					this.loading = false;
				} catch (err) {
					this.error = `启动失败: ${err.message}`;
					this.loading = false;
					console.error('详细错误:', err);
				}
			},

			async stopRecording() {
				try {
					if (this.mediaStream) {
						this.mediaStream.getTracks().forEach(track => track.stop());
					}
					if (this.audioContext) {
						await this.audioContext.close();
					}
					this.isRecording = false;
				} catch (err) {
					this.error = `停止失败: ${err.message}`;
				}
			}
		},
		beforeDestroy() {
			this.stopRecording();
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		text-align: center;
	}

	button {
		padding: 10px 20px;
		margin: 10px;
	}

	.error {
		color: red;
	}

	.loading {
		color: #666;
	}

	.result {
		margin: 20px;
		min-height: 60px;
		border: 1px solid #eee;
		padding: 10px;
	}
</style>