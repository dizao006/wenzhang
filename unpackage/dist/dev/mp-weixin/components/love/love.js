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
  __name: "love",
  setup(__props) {
    async function changeSaveHeart(e) {
      e.stopPropagation();
      common_vendor.index.navigateTo({
        url: "/pages/userinfo/login/login"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "heart",
          color: "$ff6600",
          size: "20"
        }),
        b: common_vendor.o(($event) => changeSaveHeart($event))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/components/love/love.vue"]]);
wx.createComponent(Component);
