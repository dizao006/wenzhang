import ajax from "../../http.js"

export const get_search_data = (data) => ajax({
	name: 'get_search_data',
	data
})