"use strict";
const ajax_http = require("../../http.js");
const AvatarUpdate = (data) => ajax_http.ajax({
  name: "AvatarUpdate",
  data
});
exports.AvatarUpdate = AvatarUpdate;
