// 云函数入口文件
const db = uniCloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	const {
		userId
	} = event;
	const res = await db.collection('drafts')
		.where({
			userId,
			status: 'draft'
		})
		.get();
	return {
		code: 0,
		data: res.data
	};

};