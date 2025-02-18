import ajax from "../../http.js";

export const addDrafts = (data) =>
	ajax({
		name: "addDrafts",
		data,
	});