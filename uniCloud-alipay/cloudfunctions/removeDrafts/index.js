'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		articleId
	} = event
	await db.collection("drafts").doc(articleId).update({
		status: "remove"
	})
	//返回数据给客户端
	return {
		code: 0
	}
};