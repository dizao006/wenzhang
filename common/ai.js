// 消息历史记录
let messageHistory = [];

export async function main(userMessage, onChunkReceived, isDeepThinking = false) {
	try {
		// 将用户消息添加到历史记录
		messageHistory.push({
			role: 'user',
			content: userMessage,
		});

		// 使用 fetch 发送请求
		const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer sk-bb9cc26da95346748beaf3a2b49ead64`, //  API Key
			},
			body: JSON.stringify({
				model: isDeepThinking ? 'deepseek-reasoner' : 'deepseek-chat', // 根据是否深度思考选择模型
				messages: messageHistory, // 直接使用历史记录
				stream: true, // 启用流式输出
			}),
		});

		// 检查响应是否成功
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// 获取流式数据的读取器
		const reader = response.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let aiResponse = '';

		while (true) {
			const {
				done,
				value
			} = await reader.read();
			if (done) {
				// 流式输出结束
				messageHistory.push({
					role: 'assistant',
					content: aiResponse,
				});
				return;
			}

			// 解码数据
			const chunk = decoder.decode(value, {
				stream: true
			});
			const lines = chunk.split('\n').filter((line) => line.trim() !== '');

			for (const line of lines) {
				if (line.startsWith('data:')) {
					const dataStr = line.slice(5).trim();
					if (dataStr === '[DONE]') {
						// 流式输出结束
						messageHistory.push({
							role: 'assistant',
							content: aiResponse,
						});
						return;
					}

					try {
						const data = JSON.parse(dataStr);
						if (data.choices && data.choices[0].delta.content) {
							// 逐步更新 AI 回复
							aiResponse += data.choices[0].delta.content;
							onChunkReceived(data.choices[0].delta.content); // 逐步显示 AI 回复
						}
					} catch (error) {
						console.error('JSON 解析失败:', error);
					}
				}
			}
		}
	} catch (error) {
		console.error('请求出错:', error);
		throw error;
	}
}

// 清空历史记录
export function clearHistory() {
	messageHistory = [];
}

// 设置背景信息
export function setBackground(background) {
	// 将背景信息作为系统消息添加到历史记录
	messageHistory.push({
		role: 'system',
		content: background,
	});
	console.log("sssabcs")
}