"use strict";
const common_vendor = require("../../common/vendor.js");
const common_isLogin = require("../../common/isLogin.js");
const _sfc_main = {
  __name: "follow",
  setup(__props) {
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    common_vendor.onLoad(async () => {
      await checkLogin();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
