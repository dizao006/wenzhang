import ajax from "../../http.js"

export const phone = (data) => ajax({
	name: 'phone',
	data
})