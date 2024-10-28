import ajax from "../../http.js"

// export const getlabelListItem = data => ajax({
// 	name: 'getlabelListItem',
// })
export const setlabelListItem = data => ajax({
	name: 'setlabelListItem',
	data
})