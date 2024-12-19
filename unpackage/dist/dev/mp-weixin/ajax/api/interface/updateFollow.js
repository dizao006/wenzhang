"use strict";
const ajax_http = require("../../http.js");
const updateFollow = (data) => ajax_http.ajax({
  name: "updateFollow",
  data
});
exports.updateFollow = updateFollow;
