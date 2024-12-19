import ajax from "../../http.js"

export const getAuthorLists = (data) => ajax({
	name: 'getAuthorLists',
	data
})