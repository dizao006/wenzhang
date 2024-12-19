"use strict";
const ajax_http = require("../../http.js");
const getAuthorLists = (data) => ajax_http.ajax({
  name: "getAuthorLists",
  data
});
exports.getAuthorLists = getAuthorLists;
