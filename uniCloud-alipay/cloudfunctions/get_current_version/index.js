'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await db.collection('version').get()

	//返回数据给客户端
	return {
		code: 0,
		data: {
			version: res.data[0].current_version,
			downLoadLinkUrl: 'https://mp-f4628022-a0b6-4cbc-9a8c-883fcc75bd20.cdn.bspapp.com/cloudstorage/__UNI__EEB4416_20241031174024.apk'
		}
	}
};