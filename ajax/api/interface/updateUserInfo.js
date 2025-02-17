import ajax from "../../http.js";

export const updateUserInfo = (data) =>
	ajax({
		name: "updateUserInfo",
		data,
	});