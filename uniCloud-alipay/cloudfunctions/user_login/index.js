'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	// event为客户端上传的参数
	const {
		type,
		loginName,
		password,
		phone
	} = event;

	// 构建匹配条件
	const matchCondition = type === 'account' ? {
		loginName,
		password
	} : {
		phone: phone
	};
	// 执行聚合查询
	const res = await db.collection('user')
		.aggregate()
		.match(matchCondition)
		.end();
	// 检查是否有数据返回
	if (res.data && res.data.length > 0) {
		return {
			code: 0,
			message: 'ok',
			data: res.data[0]
		};
	} else {
		return {
			code: 1,
			message: '获取用户信息失败'
		};
	}
};