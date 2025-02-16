"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_parse2 = common_vendor.resolveComponent("uv-parse");
  _easycom_uv_parse2();
}
const _easycom_uv_parse = () => "../../uni_modules/uv-parse/components/uv-parse/uv-parse.js";
if (!Math) {
  _easycom_uv_parse();
}
const _sfc_main = {
  __name: "preView",
  setup(__props) {
    const store = common_vendor.useStore();
    const id = common_vendor.ref("");
    const html = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      id.value = options.id;
      html.value = store.state.articList[id.value].html;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          content: html.value,
          selectable: true,
          lazyLoad: "true"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
