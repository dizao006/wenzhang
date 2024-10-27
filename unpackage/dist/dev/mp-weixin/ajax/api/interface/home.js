"use strict";
const ajax_http = require("../../http.js");
const getLableList = (data) => ajax_http.ajax({
  name: "getLobarList",
  data
});
const get_article_list = (data) => ajax_http.ajax({
  name: "get_article_list",
  data
});
exports.getLableList = getLableList;
exports.get_article_list = get_article_list;
