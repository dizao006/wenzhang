"use strict";
const db = uniCloud.database();

exports.main = async (event, context) => {
	// 从客户端接收的数据
	const {
		pwd,
		id
	} = event;
	console.log(pwd, id)
	// 检查是否提供了 _id
	const res = await db.collection("user").doc(id).update({
		password: pwd
	});
	const result = await db.collection("user").doc(id).get()
	return {
		code: 0,
		data: {
			msg: "操作成功",
			code: 0,
			result: result.data[0]
		},
	};
};