"use strict";
const ajax_http = require("../../http.js");
const updateGoodOk = (data) => ajax_http.ajax({
  name: "updateGoodOk",
  data
});
exports.updateGoodOk = updateGoodOk;
