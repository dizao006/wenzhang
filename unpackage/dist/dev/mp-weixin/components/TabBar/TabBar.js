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
  __name: "TabBar",
  props: ["activeIndex", "labeList"],
  emits: ["changeIndex"],
  setup(__props, { emit: __emit }) {
    let prop = __props;
    let emit = __emit;
    let currentIndex = common_vendor.ref(`item0`);
    function changeActive(index) {
      emit("changeIndex", index);
    }
    common_vendor.watch(() => prop.activeIndex, (val) => {
      currentIndex.value = `item${val}`;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.labeList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => changeActive(index), item.id),
            c: __props.activeIndex == index ? 1 : "",
            d: item.id,
            e: `item${index}`
          };
        }),
        b: common_vendor.unref(currentIndex),
        c: common_vendor.p({
          type: "gear",
          size: "26",
          color: "#666"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e632d448"], ["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/components/TabBar/TabBar.vue"]]);
wx.createComponent(Component);
