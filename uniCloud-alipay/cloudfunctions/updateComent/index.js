'use strict';
const db = uniCloud.database();
const dbcmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		userId,
		articleId,
		content,
		comment_id = '',
		isRepaly = false, //是否是子评论与子评论的回复
		repaly_id = '' //子评论的id
	} = event
	//获取用户信息
	let user = await db.collection('user').doc(userId).get()
	user = user.data[0]
	//获取文章信息
	const artic = await db.collection('article').doc(articleId).get()
	const comments = artic.data[0].comments
	let commentObj = {
		comment_id: generatedId(5),
		content,
		createTime: Date.now(),
		isRepaly,
		replay: [],
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professinonal: user.professinonal
		}
	}
	if (comment_id == '') {
		commentObj.replay = []
		commentObj = dbcmd.unshift([commentObj])
	} else {
		//找到指定的评论，修改repaly属性
		let commentAuthor = null
		let commentIndex = comments.findIndex(e => e.comment_id === comment_id)
		//如果是子评论回复子评论
		if (isRepaly) {
			commentAuthor = comments[commentIndex].replay.find(e => e.comment_id === repaly_id)
				.author //找指定的用户
				.author_name //当前发布评论这个人
		} else {
			commentAuthor = comments.find(item => item.comment_id === comment_id).author.author_name
		}
		commentObj.to = commentAuthor
		commentObj = {
			[commentIndex]: {
				replay: dbcmd.unshift([commentObj])
			}
		}
	}

	await db.collection('article').doc(articleId).update({
		comments: commentObj
	})
	//返回数据给客户端
	//生产唯一id
	function generatedId(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36)
	}
	return {
		code: 0,
		data: {
			msg: '添加成功'
		}
	}
};