import ajax from "../../http.js"

export const addUser = (data) => ajax({
	name: 'addUser',
	data
})