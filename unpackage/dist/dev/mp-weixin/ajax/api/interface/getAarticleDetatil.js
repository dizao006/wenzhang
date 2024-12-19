"use strict";
const ajax_http = require("../../http.js");
function getAarticleDetatil(data) {
  return ajax_http.ajax({
    name: "get_article_Detatil",
    data
  });
}
exports.getAarticleDetatil = getAarticleDetatil;
