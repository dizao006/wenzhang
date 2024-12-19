import ajax from "../../http.js"

export const AvatarUpdate = (data) => ajax({
	name: 'AvatarUpdate',
	data
})