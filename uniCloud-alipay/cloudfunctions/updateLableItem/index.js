'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		labelList,
		userId
	} = event
	console.log(labelList, userId, "ssss")
	let res = await db.collection('user').doc(userId).update({
		labelIds: labelList
	})

	//返回数据给客户端
	return {
		code: 0,
		data: {
			message: '保存成功'
		}
	}
};