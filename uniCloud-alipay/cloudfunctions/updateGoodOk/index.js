'use strict';
const db = uniCloud.database()
const dbcmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		articId,
		userId
	} = event
	const user = await db.collection('user').doc(userId).get()
	const articles = await db.collection('article').doc(articId).get()
	let count = articles.data[0].thumbs_up_count
	const article_ids = user.data[0].thumbs_up_article_ids
	let upCmd = null
	if (article_ids.includes(articId)) {
		upCmd = dbcmd.pull(articId)
		count = count - 1
	} else {
		upCmd = dbcmd.addToSet(articId)
		count = count + 1
	}
	console.log(upCmd, count, "upCmd")
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids: upCmd
	})
	await db.collection('article').doc(articId).update({
		thumbs_up_count: count,
	})
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: '操作成功'
		}
	}
};