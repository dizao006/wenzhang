import ajax from "../../http.js"

export const updateLableItem = (data) => ajax({
	name: 'updateLableItem',
	data
})