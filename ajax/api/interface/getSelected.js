import ajax from "../../http.js"

export const getSelected = (data) => ajax({
	name: 'getSelected',
	data
})