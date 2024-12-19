"use strict";
const ajax_http = require("../../http.js");
const get_search_data = (data) => ajax_http.ajax({
  name: "get_search_data",
  data
});
exports.get_search_data = get_search_data;
