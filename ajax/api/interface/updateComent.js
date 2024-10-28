import ajax from "../../http.js"

export const updateComent = (data) => ajax({
	name: 'updateComent',
	data
})