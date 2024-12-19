'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
	} = event
	const user = await db.collection("user").doc(userId).get()
	const selected = user.data[0].selected
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: '获取成功',
			data: selected
		}
	}
};