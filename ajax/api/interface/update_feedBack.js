import ajax from "../../http.js"
export const update_feedBack = data => ajax({
	name: 'update_feedBack',
	data
})