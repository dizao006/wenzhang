import ajax from "../../http.js"


export const getCommentData = (data) => ajax({
	name: 'getCommentData',
	data
})