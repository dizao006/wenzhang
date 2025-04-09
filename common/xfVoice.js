// utils/xfVoice.js
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';

const APPID = '0136c524';
const API_KEY = '67019a2bc74f1162bd55ed5ab312152a';
const API_SECRET = 'YjVkZjEwZjczZTQyZjkwM2MzMWEzZTJi';
const HOST = 'iat-api.xfyun.cn';
const PATH = '/v2/iat';

export class XfVoiceRecognizer {
	constructor() {
		this.socket = null;
		this.isRecording = false;
		this.recorderManager = null;
		this.audioContext = null;
		this.scriptProcessor = null;
		this.onTextUpdate = null;
		this.onError = null;
		this.isH5 = typeof window !== 'undefined' && !window.navigator.userAgent.toLowerCase().includes(
			'micromessenger');
	}

	// 生成鉴权URL（保持不变）
	getAuthUrl() {
		const date = new Date().toGMTString();
		const signatureOrigin = `host: ${HOST}\ndate: ${date}\nGET ${PATH} HTTP/1.1`;
		const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, API_SECRET);
		const signature = CryptoJS.enc.Base64.stringify(signatureSha);
		const authorizationOrigin =
			`api_key="${API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
		const authorization = Base64.encode(authorizationOrigin);
		// wss://iat-api.xfyun.cn/v2/iat
		return `wss://${HOST}${PATH}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${HOST}`;
	}

	// 初始化方法（适配H5）
	init(onTextUpdate, onError) {
		this.onTextUpdate = onTextUpdate;
		this.onError = onError;

		if (this.isH5) {
			// H5环境使用Web Audio API
			this.initH5Recorder();
		} else {
			// App环境使用uni.getRecorderManager
			this.recorderManager = uni.getRecorderManager();
			this.recorderManager.onFrameRecorded((res) => {
				if (this.isRecording && this.socket?.readyState === WebSocket.OPEN) {
					this.sendAudio(res.frameBuffer);
				}
			});
		}
	}

	// H5环境录音初始化
	initH5Recorder() {
		return new Promise((resolve, reject) => {
			try {
				const AudioContext = window.AudioContext || window.webkitAudioContext;
				this.audioContext = new AudioContext();
				this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);

				navigator.mediaDevices.getUserMedia({
						audio: true
					})
					.then((stream) => {
						this.mediaStream = stream;
						this.source = this.audioContext.createMediaStreamSource(stream);
						this.source.connect(this.scriptProcessor);
						this.scriptProcessor.connect(this.audioContext.destination);
						resolve();
					})
					.catch(reject);

				this.scriptProcessor.onaudioprocess = (e) => {
					if (this.isRecording && this.socket?.readyState === WebSocket.OPEN) {
						const audioData = this.convertFloat32ToInt16(e.inputBuffer.getChannelData(0));
						this.sendAudio(audioData);
					}
				};
			} catch (err) {
				reject(err);
			}
		});
	}

	// 音频格式转换（H5需要）
	convertFloat32ToInt16(buffer) {
		const l = buffer.length;
		const buf = new Int16Array(l);
		for (let i = 0; i < l; i++) {
			buf[i] = Math.min(1, buffer[i]) * 0x7FFF;
		}
		return buf.buffer;
	}

	// 开始录音（适配H5）
	start() {
		// console.log("开始")
		if (this.isRecording) return;
		this.isRecording = true;

		if (this.isH5) {
			this.initSocket();
		} else {
			this.initSocket();
			this.recorderManager.start({
				format: 'PCM',
				sampleRate: 16000,
				numberOfChannels: 1,
				frameSize: 1280
			});
		}
	}

	// 停止录音（适配H5）
	stop() {
		if (!this.isRecording) return;
		this.isRecording = false;

		if (!this.isH5) {
			this.recorderManager.stop();
		}

		if (this.socket?.readyState === WebSocket.OPEN) {
			this.sendEndFrame();
		}

		if (this.isH5 && this.mediaStream) {
			this.mediaStream.getTracks().forEach(track => track.stop());
		}
	}

	// WebSocket相关方法（保持不变）
	initSocket() {
		const url = this.getAuthUrl();
		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			this.sendStartFrame();
		};

		this.socket.onmessage = (e) => {
			const data = JSON.parse(e.data);
			console.log(data, "text")
			if (data.code !== 0) {
				this.onError(`识别错误: ${data.message}`);
				return;
			}
			const text = data.data?.result?.ws.map(ws => ws.cw[0].w).join('');
			if (text && this.onTextUpdate) this.onTextUpdate(text);
		};

		this.socket.onerror = (e) => {
			this.onError('语音识别连接错误');
		};
	}

	sendStartFrame() {
		const frame = {
			common: {
				app_id: APPID
			},
			business: {
				language: 'zh_cn',
				domain: 'iat'
			},
			data: {
				status: 0,
				format: 'audio/L16;rate=16000'
			}
		};
		this.socket.send(JSON.stringify(frame));
	}

	sendAudio(buffer) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({
				data: {
					status: 1,
					audio: Base64.encode(buffer)
				}
			}));
		}
	}

	sendEndFrame() {
		this.socket.send(JSON.stringify({
			data: {
				status: 2
			}
		}));
		this.socket.close();
	}

}