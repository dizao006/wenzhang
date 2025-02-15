"use strict";
const common_vendor = require("../common/vendor.js");
const state = {
  userInfo: common_vendor.index.getStorageSync("userInfo") || null,
  historyList: common_vendor.index.getStorageSync("historyList") || [],
  labelList: common_vendor.index.getStorageSync("labelList") || [],
  labelListItem: common_vendor.index.getStorageSync("labelListItem") || [],
  articList: {},
  selected: []
};
exports.state = state;
