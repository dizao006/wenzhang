"use strict";
const ajax_http = require("../../http.js");
const getCommentData = (data) => ajax_http.ajax({
  name: "getCommentData",
  data
});
exports.getCommentData = getCommentData;
