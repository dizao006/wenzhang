"use strict";
const ajax_http = require("../../http.js");
const phone = (data) => ajax_http.ajax({
  name: "phone",
  data
});
exports.phone = phone;
