"use strict";
const ajax_http = require("../../http.js");
const addSelected = (data) => ajax_http.ajax({
  name: "addSelected",
  data
});
exports.addSelected = addSelected;
