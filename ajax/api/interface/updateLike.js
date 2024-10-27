import ajax from "../../http.js"

export const updateLike = (data) => ajax({
	name: 'updateLike',
	data
})