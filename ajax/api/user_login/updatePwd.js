import ajax from "../../http.js"

export const updatePwd = (data) => ajax({
	name: 'updatePwd',
	data
})