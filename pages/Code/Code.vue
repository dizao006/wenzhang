<template>
	<view class="container">
		<view class="question-selector">
			<picker mode="selector" :range="questions" range-key="title" @change="onQuestionChange">
				<view class="selector-content">
					<text>当前题目：{{ currentQuestion.title }}</text>
					<uni-icons type="arrowdown" size="16" color="#666"></uni-icons>
				</view>
			</picker>
		</view>
		<!-- 题目区域 -->
		<scroll-view class="question-section" scroll-y>
			<view class="question-header">
				<text class="question-title">{{ currentQuestion.title }}</text>
				<text class="question-index">题目 {{ currentQuestionIndex + 1 }}/{{ questions.length }}</text>
			</view>
			<view class="question-content">{{ currentQuestion.content }}</view>
			<view class="question-example" v-if="currentQuestion.example">
				<text class="example-title">📝 示例：</text>
				<text class="example-content">{{ currentQuestion.example }}</text>
			</view>
		</scroll-view>

		<!-- 代码编辑区域 -->
		<view class="code-section">
			<view class="code-header">
				<text class="code-lang">JavaScript</text>
				<view class="code-actions">
					<button class="code-btn" @click="formatCode">
						<uni-icons type="brush" size="14" color="#abb2bf"></uni-icons>
						<text>格式化</text>
					</button>
				</view>
			</view>

			<!-- 固定函数结构 -->
			<scroll-view class="editor-wrapper" scroll-y>
				<view class="function-wrapper">
					<view class="function-signature">
						{{ functionSignature }}
					</view>
					<textarea class="code-editor" v-model="userAnswer" placeholder="// 在此编写你的代码"
						:show-confirm-bar="false" cursor-spacing="20" @input="onCodeInput"
						:adjust-position="false"></textarea>
					<view class="function-close">
						}
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-buttons">
			<button class="run-btn" @click="runCode">
				<uni-icons type="play" size="16" color="white"></uni-icons>
				<text>运行代码</text>
			</button>
			<button class="submit-btn" @click="submitCode">
				<uni-icons type="checkmark" size="16" color="white"></uni-icons>
				<text>提交答案</text>
			</button>
		</view>

		<!-- 结果展示 -->
		<view class="result-section" v-if="testResults.length > 0"
			:style="{ height: showResults ? '30vh' : '0', overflow: 'hidden' }">
			<view class="section-header">
				<text class="section-title">🧪 测试结果</text>
				<text class="pass-rate">通过率 {{ passRate }}%</text>
			</view>
			<view v-for="(result, index) in testResults" :key="index" class="test-result">
				<view class="result-header">
					<text :class="['result-icon', result.passed ? 'passed' : 'failed']">
						{{ result.passed ? '✓' : '✗' }}
					</text>
					<text class="result-title">测试用例 {{ index + 1 }}</text>
				</view>
				<view class="result-detail">
					<text class="detail-label">输入:</text>
					<text class="detail-value">{{ result.input }}</text>
				</view>
				<view class="result-detail">
					<text class="detail-label">预期:</text>
					<text class="detail-value">{{ result.expected }}</text>
				</view>
				<view class="result-detail" v-if="!result.passed">
					<text class="detail-label">实际:</text>
					<text class="detail-value error">{{ result.actual }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questions: [{
						id: 1,
						title: "两数之和",
						content: "编写一个 sum 函数，接收两个数字参数，返回它们的和。",
						example: "sum(2, 3) 应返回 5",
						functionSignature: "function sum(a, b) {",
						testCases: [{
								input: [2, 3],
								expected: 5
							},
							{
								input: [-1, 1],
								expected: 0
							},
							{
								input: [0, 0],
								expected: 0
							}
						]
					},
					{
						id: 2,
						title: "数组求和",
						content: "编写一个 arraySum 函数，接收一个数字数组，返回所有元素的和。",
						example: "arraySum([1, 2, 3]) 应返回 6",
						functionSignature: "function arraySum(arr) {",
						testCases: [{
								input: [
									[1, 2, 3]
								],
								expected: 6
							},
							{
								input: [
									[10, 20]
								],
								expected: 30
							},
							{
								input: [
									[-1, 0, 1]
								],
								expected: 0
							}
						]
					},
					{
						id: 3,
						title: "数组扁平化",
						content: "编写一个flatten函数，接收一个嵌套数组，返回扁平化的新数组。",
						example: "flatten([1, [2, [3]]]) 应返回 [1, 2, 3]",
						functionSignature: "function flatten(arr) {",
						testCases: [{
								input: [
									[1, [2, [3]]]
								],
								expected: [1, 2, 3]
							},
							{
								input: [
									[
										[]
									]
								],
								expected: []
							},
							{
								input: [
									[1, 2, 3]
								],
								expected: [1, 2, 3]
							}
						]
					},
					{
						id: 4,
						title: "字符串反转",
						content: "编写一个reverseString函数，接收一个字符串，返回反转后的字符串。",
						example: "reverseString('hello') 应返回 'olleh'",
						functionSignature: "function reverseString(str) {",
						testCases: [{
								input: ["hello"],
								expected: "olleh"
							},
							{
								input: ["abc"],
								expected: "cba"
							},
							{
								input: [""],
								expected: ""
							}
						]
					},
					{
						id: 5,
						title: "阶乘计算",
						content: "编写一个factorial函数，接收一个正整数n，返回n的阶乘。",
						example: "factorial(5) 应返回 120",
						functionSignature: "function factorial(n) {",
						testCases: [{
								input: [5],
								expected: 120
							},
							{
								input: [3],
								expected: 6
							},
							{
								input: [0],
								expected: 1
							}
						]
					}, {
						id: 6,
						title: "判断素数",
						content: "编写一个isPrime函数，接收一个正整数，判断是否为素数。",
						example: "isPrime(7) 应返回 true",
						functionSignature: "function isPrime(n) {",
						testCases: [{
								input: [7],
								expected: true
							},
							{
								input: [4],
								expected: false
							},
							{
								input: [1],
								expected: false
							}
						]
					}, {
						id: 7,
						title: "斐波那契数列",
						content: "编写一个fibonacci函数，接收一个正整数n，返回第n项斐波那契数。",
						example: "fibonacci(6) 应返回 8",
						functionSignature: "function fibonacci(n) {",
						testCases: [{
								input: [6],
								expected: 8
							},
							{
								input: [1],
								expected: 1
							},
							{
								input: [10],
								expected: 55
							}
						]
					}
				],

				currentQuestionIndex: 0,
				userAnswer: "",
				lineCount: 1,
				testResults: [],
				showResults: false,
			}
		},
		computed: {
			currentQuestion() {
				return this.questions[this.currentQuestionIndex]
			},
			functionSignature() {
				return this.currentQuestion.functionSignature
			},
			passRate() {
				if (this.testResults.length === 0) return 0
				const passed = this.testResults.filter(r => r.passed).length
				return Math.round((passed / this.testResults.length) * 100)
			},
			fullCode() {
				return `${this.functionSignature}\n${this.userAnswer}\n}`
			}
		},
		methods: {
			onCodeInput(e) {
				this.userAnswer = e.detail.value
				this.lineCount = Math.max(1, this.userAnswer.split('\n').length + 2) // +2 包含函数签名和闭合括号
			},
			onQuestionChange(e) {
				const newIndex = e.detail.value
				if (newIndex !== this.currentQuestionIndex) {
					this.currentQuestionIndex = newIndex
					this.userAnswer = ""
					this.testResults = []
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
				}
			},
			formatCode() {
				// 只格式化用户编写的部分
				this.userAnswer = this.userAnswer
					.replace(/\{\s*/g, "{\n  ")
					.replace(/\s*\}/g, "\n}")
					.replace(/;\s*/g, ";\n")
					.replace(/\n\s*\n/g, "\n")
			},

			runCode() {
				this.showResults = true;
				this.testResults = []

				try {
					const funcName = this.functionSignature.match(/function\s+(\w+)/)[1]
					const func = new Function(`${this.fullCode}\nreturn ${funcName};`)()

					if (typeof func !== 'function') {
						uni.showToast({
							title: '请正确定义函数',
							icon: 'none'
						})
						return
					}

					this.currentQuestion.testCases.forEach(testCase => {
						let actual, passed = false
						try {
							actual = func(...testCase.input)
							passed = JSON.stringify(actual) === JSON.stringify(testCase.expected)
						} catch (e) {
							actual = `执行错误: ${e.message}`
						}

						this.testResults.push({
							input: JSON.stringify(testCase.input),
							expected: JSON.stringify(testCase.expected),
							actual: JSON.stringify(actual),
							passed
						})
					})

				} catch (e) {
					uni.showToast({
						title: `代码错误: ${e.message}`,
						icon: 'none',
						duration: 3000
					})
				}
			},
			submitCode() {
				this.showResults = true;
				if (this.testResults.every(r => r.passed)) {
					uni.showModal({
						title: '提交成功',
						content: `恭喜通过所有测试用例！得分: ${this.passRate}分`,
						success: () => {
							if (this.currentQuestionIndex < this.questions.length - 1) {
								this.currentQuestionIndex++
								this.userAnswer = ""
								this.testResults = []
							}
						}
					})

				} else {
					uni.showToast({
						title: `请先通过所有测试用例 (${this.passRate}%)`,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 20px;
		background: #f8fafc;
	}

	/* 新增题目选择器样式 */
	.question-selector {
		margin-bottom: 16px;
		padding: 12px 16px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

		.selector-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 15px;
			color: #333;
		}
	}

	/* 题目区域 */
	.question-section {
		flex: none;
		height: 30vh;
		padding: 5px;
		background: white;
		border-radius: 12px;
		margin-bottom: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

		.question-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
		}

		.question-title {
			font-size: 18px;
			font-weight: 600;
			color: #2c3e50;
		}

		.question-index {
			font-size: 14px;
			color: #7f8c8d;
			background: #f1f5f9;
			padding: 2px 8px;
			border-radius: 10px;
		}

		.question-content {
			font-size: 15px;
			line-height: 1.6;
			color: #34495e;
			margin-bottom: 12px;
		}

		.question-example {
			margin-top: 12px;
			padding: 10px;
			background: #f0f7ff;
			border-radius: 6px;
			border-left: 3px solid #4a8cff;

			.example-title {
				font-size: 14px;
				font-weight: 500;
				color: #4a8cff;
				margin-right: 8px;
			}

			.example-content {
				font-size: 14px;
				color: #4a5568;
				font-family: monospace;
			}
		}
	}

	/* 代码编辑区域 */
	.code-section {
		position: relative;
		flex: 1;
		min-height: 200px;
		margin-bottom: 16px;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

		.code-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 16px;
			background: #282c34;
			color: #abb2bf;
			font-family: 'SF Mono', monospace;

			.code-actions {
				display: flex;
				gap: 8px;

				.code-btn {
					display: flex;
					align-items: center;
					gap: 4px;
					padding: 4px 10px;
					background: #3a3f4b;
					color: #abb2bf;
					border: none;
					border-radius: 4px;
					font-size: 12px;

					&:active {
						background: #4a4f5b;
					}
				}
			}
		}

		.function-wrapper {
			position: relative;
			background: #282c34;
			padding: 0 16px 0 50px;

			.function-signature {
				padding: 8px 0;
				color: #61afef;
				font-family: 'Fira Code', monospace;
				font-size: 14px;
				border-bottom: 1px solid #3a3f4b;
			}

			.code-editor {
				width: 100%;
				min-height: 120px;
				padding: 8px 0;
				font-family: 'Fira Code', monospace;
				font-size: 14px;
				line-height: 1.5;
				color: #abb2bf;
				background: transparent;
				caret-color: #528bff;
			}

			.function-close {
				padding: 8px 0;
				color: #61afef;
				font-family: 'Fira Code', monospace;
				font-size: 14px;
				border-top: 1px solid #3a3f4b;
			}
		}

		.line-numbers {
			position: absolute;
			left: 0;
			top: 40px;
			bottom: 0;
			width: 40px;
			padding: 8px 5px;
			background: #21252b;
			color: #5c6370;
			font-family: 'Fira Code', monospace;
			font-size: 14px;
			line-height: 1.5;
			text-align: right;
		}
	}

	/* 操作按钮 */
	.action-buttons {
		display: flex;
		gap: 12px;
		margin-bottom: 16px;

		.run-btn,
		.submit-btn {
			flex: 1;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			border-radius: 8px;
			font-size: 15px;
			font-weight: 500;
			transition: all 0.2s;

			&:active {
				transform: scale(0.98);
			}
		}

		.run-btn {
			background: linear-gradient(135deg, #4a8cff 0%, #3a7bf0 100%);
			color: white;
			box-shadow: 0 2px 8px rgba(74, 140, 255, 0.3);
		}

		.submit-btn {
			background: linear-gradient(135deg, #09bb07 0%, #08aa06 100%);
			color: white;
			box-shadow: 0 2px 8px rgba(9, 187, 7, 0.3);
		}
	}

	/* 结果展示区域 */
	.result-section {
		flex: none;
		max-height: 30vh;
		padding: 16px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		overflow-y: auto;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;

			.section-title {
				font-size: 16px;
				font-weight: 600;
				color: #2c3e50;
			}

			.pass-rate {
				font-size: 14px;
				color: #7f8c8d;
			}
		}

		.test-result {
			margin-bottom: 12px;
			padding-bottom: 12px;
			border-bottom: 1px solid #f1f5f9;

			&:last-child {
				border-bottom: none;
				margin-bottom: 0;
				padding-bottom: 0;
			}

			.result-header {
				display: flex;
				align-items: center;
				margin-bottom: 8px;

				.result-icon {
					width: 20px;
					height: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 8px;
					border-radius: 50%;
					font-size: 12px;

					&.passed {
						background: rgba(9, 187, 7, 0.1);
						color: #09bb07;
					}

					&.failed {
						background: rgba(245, 108, 108, 0.1);
						color: #f56c6c;
					}
				}

				.result-title {
					font-size: 14px;
					font-weight: 500;
					color: #34495e;
				}
			}

			.result-detail {
				display: flex;
				margin-bottom: 4px;
				font-size: 13px;

				.detail-label {
					width: 40px;
					color: #7f8c8d;
				}

				.detail-value {
					flex: 1;
					color: #2c3e50;
					font-family: monospace;

					&.error {
						color: #f56c6c;
					}
				}
			}
		}
	}
</style>