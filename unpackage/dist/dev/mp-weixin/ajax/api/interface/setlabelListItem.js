"use strict";
const ajax_http = require("../../http.js");
const setlabelListItem = (data) => ajax_http.ajax({
  name: "setlabelListItem",
  data
});
exports.setlabelListItem = setlabelListItem;
