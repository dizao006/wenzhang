"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  setUserinfo();
}
const setUserinfo = () => "../../components/set-userinfo/set-userinfo.js";
const _sfc_main = {
  __name: "dataConfig",
  setup(__props) {
    const store = common_vendor.useStore();
    function updateStore(userInfo) {
      store.commit("updateUserInfo", userInfo);
      common_vendor.index.switchTab({
        url: "/pages/self/self"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(updateStore),
        b: common_vendor.p({
          userInfo: common_vendor.unref(store).state.userInfo
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
