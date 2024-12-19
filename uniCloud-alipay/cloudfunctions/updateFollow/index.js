'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
		authorId
	} = event
	const user = await db.collection('user').doc(userId).get()
	console.log(user, 'user')
	const author_likes_ids = user.data[0].author_likes_ids || []
	let authorIds = null
	let result = ''
	if (author_likes_ids.includes(authorId)) {
		result = '取消关注'
		authorIds = dbCmd.pull(authorId) //通过指令的形式进行对数据库修改，此处只是拿到了指令，还并未对数据库进行操作
	} else {
		result = '关注成功'
		authorIds = dbCmd.addToSet(authorId)
	}
	await db.collection('user').doc(userId).update({
		author_likes_ids: authorIds
	})
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: result,
		}
	}
};