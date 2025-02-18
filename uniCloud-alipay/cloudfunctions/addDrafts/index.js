// 云函数入口文件
const db = uniCloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const {
		Drafts,
		articleId
	} = event;
	console.log(articleId, ":articleId");

	try {
		// 尝试查询是否存在指定 articleId 的文档
		const queryResult = await db.collection('drafts').doc(articleId).get();
		console.log(queryResult, "queryResult");

		if (queryResult.data.length > 0) {
			// 如果存在该 articleId 的文档，则进行更新操作
			await db.collection('drafts').doc(articleId).update(Drafts);
			return {
				code: 0,
				msg: "更新操作成功"
			};
		} else {
			// 如果不存在该 articleId 的文档，则进行新增操作
			await db.collection('drafts').add({
				...Drafts,
				_id: articleId // 确保新增文档的 _id 为 articleId
			});
			return {
				code: 0,
				msg: "新增操作成功"
			};
		}
	} catch (e) {
		console.error('操作失败:', e);
		return {
			code: 1,
			msg: "操作失败",
			error: e.message
		};
	}
};