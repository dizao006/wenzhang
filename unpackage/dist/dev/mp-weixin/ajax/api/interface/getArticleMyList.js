"use strict";
const ajax_http = require("../../http.js");
const getArticleMyList = (data) => ajax_http.ajax({
  name: "getArticleMyList",
  data
});
exports.getArticleMyList = getArticleMyList;
