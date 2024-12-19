"use strict";
const ajax_http = require("../../http.js");
const user_login = (data) => ajax_http.ajax({
  name: "user_login",
  data
});
exports.user_login = user_login;
