"use strict";
const common_vendor = require("../common/vendor.js");
const mutations = {
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    common_vendor.index.setStorage({
      key: "userInfo",
      data: userInfo
    });
  },
  setHistoryList(state, value) {
    let list = state.historyList;
    if (list.length > 0 && list.findIndex((e) => e == value) != -1)
      return;
    list.unshift(value);
    common_vendor.index.setStorageSync("historyList", list);
    state.historyList = list;
  },
  clearData(state) {
    common_vendor.index.showToast({
      title: "清空成功",
      icon: "none"
    });
    state.historyList = [];
    common_vendor.index.setStorageSync("historyList", []);
  },
  setlabelList(state, data) {
    common_vendor.index.setStorageSync("labelList", data);
    state.labelList = data;
  },
  setlabelListItem(state, data) {
    common_vendor.index.setStorageSync("labelListItem", data);
    state.labelListItem = data;
  }
};
exports.mutations = mutations;
