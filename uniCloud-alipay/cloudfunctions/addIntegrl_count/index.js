"use strict";
const db = uniCloud.database();

exports.main = async (event, context) => {
	// 从客户端接收的数据
	const {
		count,
		id
	} = event;
	// 检查是否提供了 _id
	const userInfo = await db.collection("user").doc(id).get()
	console.log(userInfo.data[0].integral_count, "ssss")
	await db.collection("user").doc(id).update({
		integral_count: userInfo.data[0].integral_count + count
	})
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