import ajax from "../../http.js"
export const updateFollow = data => ajax({
	name: 'updateFollow',
	data
})