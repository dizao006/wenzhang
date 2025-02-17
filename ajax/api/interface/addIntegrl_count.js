import ajax from "../../http.js";

export const addIntegrl_count = (data) =>
	ajax({
		name: "addIntegrl_count",
		data,
	});