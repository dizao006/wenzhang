"use strict";
const ajax_http = require("../../http.js");
const updateLike = (data) => ajax_http.ajax({
  name: "updateLike",
  data
});
exports.updateLike = updateLike;
