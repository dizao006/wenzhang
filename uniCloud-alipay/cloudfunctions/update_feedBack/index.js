'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		content,
		userId,
		feedBackImageList
	} = event
	console.log(feedBackImageList, 'feedBackImageList')
	await db.collection('feedbackk').add({
		userId,
		feedBackImageList,
		content
	})

	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: '反馈成功'
		}

	}
};