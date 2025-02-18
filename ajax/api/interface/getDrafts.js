import ajax from "../../http.js";

export const getDrafts = (data) =>
	ajax({
		name: "getDrafts",
		data,
	});