"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _component_uni_section + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_icons + Lbut + FAQVue)();
}
const Lbut = () => "../../components/Lbut/lbut/lbut.js";
const FAQVue = () => "../../components/FAQ/FAQ.js";
const _sfc_main = {
  __name: "VipBuy",
  setup(__props) {
    function buy() {
      common_vendor.index.showToast({
        title: "功能暂未开启",
        icon: "error"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(buy),
        b: common_vendor.o(_ctx.onClick),
        c: common_vendor.p({
          title: "缔造掘金VIP会员",
          ["sub-title"]: "年度会员专项五折优惠",
          extra: "",
          thumbnail: "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd3e238ee7f46eab42bf88af17f5528~tplv-k3u1fbpfcp-image.image"
        }),
        d: common_vendor.p({
          title: "双标题卡片",
          type: "line"
        }),
        e: common_vendor.p({
          type: "cart",
          size: "36",
          color: "#666"
        }),
        f: common_vendor.p({
          type: "color",
          size: "36",
          color: "#666"
        }),
        g: common_vendor.p({
          type: "vip",
          size: "36",
          color: "#666"
        }),
        h: common_vendor.p({
          type: "bars",
          size: "36",
          color: "#666"
        }),
        i: common_vendor.p({
          type: "down",
          size: "22",
          color: "#666"
        }),
        j: common_vendor.p({
          type: "down",
          size: "22",
          color: "#666"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4fbe6ee"]]);
wx.createPage(MiniProgramPage);
