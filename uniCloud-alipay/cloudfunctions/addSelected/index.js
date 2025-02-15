'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
		data
	} = event
	// console.log(userId, data)
	const user = await db.collection("user").doc(userId).get()
	const selected = user.data[0].selected //收藏文章的数组
	const newSelected = [...selected, data]
	await db.collection('user').doc(userId).update({
		selected: newSelected
	})
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: 'ok'
		}
	}
};