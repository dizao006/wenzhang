'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		articleId
	} = event
	let res = await db.collection('drafts').doc(articleId).get()

	//返回数据给客户端
	return {
		code: 0,
		data: res.data[0]
	}
};