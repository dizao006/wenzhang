'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		showTable,
		userId
	} = event
	const res = db.collection('user').doc(userId).update({
		labelListItem: showTable
	})
	return {
		code: 0
	}
};