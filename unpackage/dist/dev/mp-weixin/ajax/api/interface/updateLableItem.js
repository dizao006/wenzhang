"use strict";
const ajax_http = require("../../http.js");
const updateLableItem = (data) => ajax_http.ajax({
  name: "updateLableItem",
  data
});
exports.updateLableItem = updateLableItem;
