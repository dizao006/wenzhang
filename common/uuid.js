export function generateArticleId() {
	const crypto = window.crypto || require('crypto'); // 在浏览器中使用window.crypto，在Node.js中通过require引入
	const array = new Uint8Array(16); // 创建一个长度为16字节的无符号整数数组
	crypto.getRandomValues(array); // 填充数组为随机值
	return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join(''); // 将数组元素转换为十六进制字符串并拼接
}