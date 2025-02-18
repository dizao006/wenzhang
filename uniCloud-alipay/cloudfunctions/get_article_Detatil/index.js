"use strict";
const db = uniCloud.database();
const dbcmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		articleId
	} = event;
	console.log(event, "event")
	console.log(articleId, "articlid")
	await db.collection('article').doc(articleId).update({
		browse_count: dbcmd.inc(1)
	})
	const res = await db
		.collection("article")
		.aggregate()
		.match({
			_id: articleId,
		})
		.end();
	//返回数据给客户端
	return {
		code: 0,
		data: res.data[0]
	};
};