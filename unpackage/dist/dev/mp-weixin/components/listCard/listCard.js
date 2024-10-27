"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_love2 = common_vendor.resolveComponent("love");
  _easycom_love2();
}
const _easycom_love = () => "../love/love.js";
if (!Math) {
  _easycom_love();
}
const _sfc_main = {
  __name: "listCard",
  props: ["list"],
  setup(__props) {
    let props = __props;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(props).list.mode === "base"
      }, common_vendor.unref(props).list.mode === "base" ? {
        b: common_vendor.unref(props).list.cover[0] ? common_vendor.unref(props).list.cover[0] : "/static/img/logo.jpeg",
        c: common_vendor.t(common_vendor.unref(props).list.title),
        d: common_vendor.t(common_vendor.unref(props).list.classify),
        e: common_vendor.t(common_vendor.unref(props).list.browse_count)
      } : {}, {
        f: common_vendor.unref(props).list.mode === "column"
      }, common_vendor.unref(props).list.mode === "column" ? {
        g: common_vendor.t(common_vendor.unref(props).list.title),
        h: common_vendor.f(common_vendor.unref(props).list.cover.slice(0, 3), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        i: common_vendor.t(common_vendor.unref(props).list.classify),
        j: common_vendor.t(common_vendor.unref(props).list.browse_count)
      } : {}, {
        k: common_vendor.unref(props).list.mode === "image"
      }, common_vendor.unref(props).list.mode === "image" ? {
        l: common_vendor.unref(props).list.cover[0],
        m: _ctx.index,
        n: common_vendor.t(common_vendor.unref(props).list.title),
        o: common_vendor.t(common_vendor.unref(props).list.classify),
        p: common_vendor.t(common_vendor.unref(props).list.browse_count)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/components/listCard/listCard.vue"]]);
wx.createComponent(Component);
