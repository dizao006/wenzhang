'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		classify,
		page = 1,
		pageSize = 10
	} = event
	let obj = {}
	if (classify !== '全部') {
		obj = {
			classify
		}
	}
	/**
	 * db.collection("article")拿到指定表的数据
	 * .aggregate()获取全部数据
	 * match 过滤，返回指定分类的数据
	 * project 讲数据里面的content都变为0
	 * skip 从第几页的数据开始返回
	 * limit 返回多少条
	 * end结束
	 */
	const list = await db.collection("article").aggregate().match(obj).project({
			content: 0
		}).skip(pageSize * (page - 1)).limit(pageSize)
		.end()

	//返回多少条当前匹配选项的数据总数
	const {
		total
	} = await db.collection('article').where(obj).count()

	//返回数据给客户端
	return {
		code: 0,
		msg: '数据获取成功',
		data: {
			articleList: list.data,
			total,
		}
	}
};