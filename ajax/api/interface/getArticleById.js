import ajax from "../../http.js";

export const getArticleById = (data) =>
	ajax({
		name: "getArticleById",
		data,
	});