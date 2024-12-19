import ajax from "../../http.js"
export const getArticleMyList = (data) => ajax({
	name: 'getArticleMyList',
	data
})