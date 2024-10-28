import ajax from "../../http.js";
export default function getAarticleDetatil(data) {
	return ajax({
		name: "get_article_Detatil",
		data,
	});
}