"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_listCard2 = common_vendor.resolveComponent("listCard");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_listCard2 + _easycom_uni_load_more2)();
}
const _easycom_listCard = () => "../listCard/listCard.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_listCard + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "ListItem",
  props: ["articleList", "loadData"],
  emits: ["loadMore"],
  setup(__props, { emit: __emit }) {
    let props = __props;
    let emit = __emit;
    let lo = common_vendor.ref("loading");
    common_vendor.watch(() => props.loadData.loading, (v, s) => {
      lo.value = v;
    });
    function loadMore() {
      emit("loadMore");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(props).articleList, (item, k0, i0) => {
          return {
            a: item.id,
            b: "0f582daa-0-" + i0,
            c: common_vendor.p({
              list: item
            })
          };
        }),
        b: common_vendor.p({
          status: common_vendor.unref(lo)
        }),
        c: common_vendor.o(loadMore)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f582daa"], ["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/components/ListItem/ListItem.vue"]]);
wx.createComponent(Component);
