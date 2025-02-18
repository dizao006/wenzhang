// 云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const {
		Drafts,
		userId,
		articleId
	} = event
	await db.collection('drafts').doc(articleId).update({
		status: Drafts.status
	})
	await db.collection("article").add(Drafts)
	const userInfo = await db.collection('user').doc(userId).get()
	await db.collection("user").doc(userId).update({
		article_ids: [...userInfo.data[0].article_ids, articleId]
	})
	return {
		code: 0,
		data: {
			msg: "操作成功",
			code: 0,
		},
	};
}