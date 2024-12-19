'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate; // 获取一个聚合的操作符

exports.main = async (event, context) => {
	const {
		userId
	} = event;

	let userInfo = await db.collection('user').doc(userId).get()
	let author_likes_ids = userInfo.data[0].author_likes_ids;
	const list = await db.collection('user')
		.aggregate()
		.addFields({
			is_like: $.in(['$id', author_likes_ids])
		})
		.project({
			password: 0,
			loginName: 0
		})
		.match({
			is_like: true
		})
		.end();

	//返回数据给客户端
	return {
		code: 0,
		msg: "请求成功",
		data: list.data
	}
};