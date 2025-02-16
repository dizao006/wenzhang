"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  methods: {}
};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _component_uni_section)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "Q·1:什么是内部课"
    }),
    b: common_vendor.p({
      title: "Q·2:如何使用会员折扣"
    }),
    c: common_vendor.p({
      title: "Q·3:购买了会员礼物什么时候能发货"
    }),
    d: common_vendor.p({
      title: "Q·4:已经购买会员，是否可以退款？"
    }),
    e: common_vendor.p({
      accordion: true
    }),
    f: common_vendor.p({
      type: "line"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
