"use strict";
const ajax_http = require("../../http.js");
const getSelected = (data) => ajax_http.ajax({
  name: "getSelected",
  data
});
exports.getSelected = getSelected;
