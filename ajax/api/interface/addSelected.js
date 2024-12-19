import ajax from "../../http.js"

export const addSelected = (data) => ajax({
	name: 'addSelected',
	data
})