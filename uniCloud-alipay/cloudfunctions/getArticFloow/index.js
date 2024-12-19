'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate //聚合操作符，用来判断是否包含指定数据
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		userId
	} = event

	const userInfo = await db.collection('user').doc(userId).get()
	const article_likeIds = userInfo.data[0].article_likes_ids //收藏文章的数组
	const list = await db.collection('article').aggregate().addFields({
			isLike: $.in(['$_id', article_likeIds])
		}).project({
			content: 0
		})
		.match({
			isLike: true
		})
		.end()

	//返回数据给客户端

	return {
		code: 0,
		data: list.data
	}
};