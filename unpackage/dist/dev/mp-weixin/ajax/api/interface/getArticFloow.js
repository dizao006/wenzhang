"use strict";
const ajax_http = require("../../http.js");
const getArticFloow = (data) => ajax_http.ajax({
  name: "getArticFloow",
  data
});
exports.getArticFloow = getArticFloow;
