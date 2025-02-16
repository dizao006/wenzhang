"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      autoplay: true,
      interval: 2e3,
      // bgUrl: "https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401_1280.png",
      swiperList: [{
        picUrl: "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c8320957b2d4fa6a8259ddcf67407b0~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis"
      }, {
        picUrl: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9107fd4e431466d9281a78598491864~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis"
      }, {
        picUrl: "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ac6ff1aab644df78deb033716480ce8~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis"
      }, {
        picUrl: "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b09bb1368a4eefb9fcf4bdde04bbd4~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis"
      }, {
        picUrl: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fef7e84d094845738b958d6f6d64e906~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis"
      }]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_liu_super_slide2 = common_vendor.resolveComponent("liu-super-slide");
  _easycom_liu_super_slide2();
}
const _easycom_liu_super_slide = () => "../../../uni_modules/liu-super-slide/components/liu-super-slide/liu-super-slide.js";
if (!Math) {
  _easycom_liu_super_slide();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      swiperList: $data.swiperList,
      bgUrl: _ctx.bgUrl,
      autoplay: $data.autoplay,
      interval: $data.interval
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
