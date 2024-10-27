'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// const list = db.collection('label')
	const {
		phone
	} = event
	const randomNumber = Math.random().toString().substr(2, 6)


	//返回数据给客户端
	return {
		code: 0,
		data: randomNumber
	}
};