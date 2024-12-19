"use strict";
const ajax_http = require("../../http.js");
const updateComent = (data) => ajax_http.ajax({
  name: "updateComent",
  data
});
exports.updateComent = updateComent;
