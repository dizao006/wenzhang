"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "NavBar",
  setup(__props) {
    let statusHeight = common_vendor.ref(20);
    let marg = common_vendor.ref(0);
    function getSystemInfo() {
      common_vendor.index.getSystemInfo().then((e) => {
        e.statusBarHeight != 0 ? statusHeight.value = e.statusBarHeight * 2 : statusHeight.value = 20;
        const menuBtn = common_vendor.index.getMenuButtonBoundingClientRect();
        statusHeight.value = menuBtn.top * 2;
        marg.value = menuBtn.width * 2;
      });
    }
    getSystemInfo();
    function toSerch() {
      common_vendor.index.navigateTo({
        url: "/pages/serch/serch"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(statusHeight) + "rpx",
        b: common_vendor.p({
          type: "search",
          color: "$999",
          size: "30"
        }),
        c: common_vendor.o(toSerch),
        d: common_vendor.unref(marg) + "rpx",
        e: common_vendor.unref(statusHeight) + 80 + "rpx"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/components/NavBar/NavBar.vue"]]);
wx.createComponent(Component);
