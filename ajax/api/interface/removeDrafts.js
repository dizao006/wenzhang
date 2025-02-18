import ajax from "../../http.js";

export const removeDrafts = (data) =>
	ajax({
		name: "removeDrafts",
		data,
	});