import ajax from "../../http.js";

export const fabu = (data) =>
	ajax({
		name: "fabu",
		data,
	});