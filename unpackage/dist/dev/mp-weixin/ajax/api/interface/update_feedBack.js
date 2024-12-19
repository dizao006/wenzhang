"use strict";
const ajax_http = require("../../http.js");
const update_feedBack = (data) => ajax_http.ajax({
  name: "update_feedBack",
  data
});
exports.update_feedBack = update_feedBack;
