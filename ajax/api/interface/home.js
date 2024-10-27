import ajax from "../../http.js"
export const getLableList = data => ajax({
	name: 'getLobarList',
	data
})
//获取文章列表

export const get_article_list = data => ajax({
	name: 'get_article_list',
	data
})