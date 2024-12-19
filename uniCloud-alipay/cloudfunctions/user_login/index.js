// 'use strict';
// const db = uniCloud.database();
// exports.main = async (event, context) => {
// 	// event为客户端上传的参数
// 	const {
// 		type,
// 		loginName,
// 		password,
// 		phone
// 	} = event;

// 	// 构建匹配条件
// 	const matchCondition = type === 'account' ? {
// 		loginName,
// 		password
// 	} : {
// 		phone: phone
// 	};
// 	// 执行聚合查询
// 	const res = await db.collection('user')
// 		.aggregate()
// 		.match(matchCondition)
// 		.end();

// 	// 检查是否有数据返回
// 	if (res.data && res.data.length > 0) {
// 		return {
// 			code: 0,
// 			message: 'ok',
// 			data: res.data[0]
// 		};
// 	} else {
// 		return {
// 			code: 1,
// 			message: '获取用户信息失败'
// 		};
// 	}
// };


'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	// event为客户端上传的参数
	const {
		type,
		loginName,
		password,
		phone
	} = event;

	// 构建匹配条件
	const matchCondition = type === 'account' ? {
		loginName,
		password
	} : {
		phone
	};

	// 执行聚合查询
	const res = await db.collection('user')
		.aggregate()
		.match(matchCondition)
		.end();

	// 检查是否有数据返回
	if (res.data && res.data.length > 0) {
		return {
			code: 0,
			message: 'ok',
			data: res.data[0]
		};
	} else {
		// 如果没有数据返回，且登录方式为手机号，则向数据库追加一条数据
		if (type === 'phone') {
			const newUser = {
				"article_ids": [],
				"article_likes_ids": [],
				"author_likes_ids": [],
				"author_name": "未命名",
				"avatar": "https://env-00jxhafly6bt.normal.cloudstatic.cn/avatar/屏幕截图 2023-04-01 122440.png?expire_at=1730363918&er_sign=4a522708f5ba2e534213956ac41dc278",
				"explain": "这个人很懒，什么也没留下",
				"fans_count": 0,
				"follow_count": 0,
				"gender": "男",
				"id": `${phone}`,
				"integral_count": "",
				"professional": "游客",
				"status": "normal",
				"thumbs_up_article_ids": [],
				"loginName": `${phone}`,
				"password": `${phone}`,
				"phone": `${phone}`,
				"labelIds": [],
				"labelListItem": [{
						"_id": "671b3554e6c31814ba555886",
						"name": "前端开发",
						"user": []
					},
					{
						"_id": "671b3554e6c31814ba555887",
						"name": "后端开发",
						"user": []
					},
					{
						"_id": "671b3554e6c31814ba555889",
						"name": "职场生活",
						"user": []
					},
					{
						"_id": "671b3554e6c31814ba55588a",
						"name": "精彩直播",
						"user": []
					},
					{
						"_id": "671b3554e6c31814ba55588b",
						"name": "每日一题",
						"user": []
					}
				]
			};
			const addRes = await db.collection('user').add(newUser);
			const user = await db.collection('user').where({
				phone: phone
			}).get()
			if (addRes && addRes.id) {
				return {
					code: 0,
					message: '用户创建成功',
					data: user.data[0],
				};
			} else {
				return {
					code: 1,
					message: '用户创建失败'
				};
			}
		} else {
			return {
				code: 1,
				message: '获取用户信息失败'
			};
		}
	}
};