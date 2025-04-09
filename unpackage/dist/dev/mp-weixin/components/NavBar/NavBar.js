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
  props: ["isSearch", "serchValue"],
  emits: ["updateValue", "sendSearchData"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const {
      isSearch,
      serchValue
    } = common_vendor.toRefs(props);
    let emit = __emit;
    let statusHeight = common_vendor.ref(20);
    let marg = common_vendor.ref(0);
    function changeInput() {
      emit("sendSearchData", valueSerch);
    }
    const valueSerch = common_vendor.computed({
      get() {
        return serchValue.value;
      },
      set(val) {
        emit("updateValue", val);
        if (!val) {
          emit("sendSearchData", val);
        }
      }
    });
    function returnAfterView() {
      common_vendor.index.switchTab({
        url: "../../pages/index/index"
      });
    }
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
      if (!isSearch.value) {
        common_vendor.index.navigateTo({
          url: "/pages/serch/serch"
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isSearch)
      }, common_vendor.unref(isSearch) ? {
        b: common_vendor.p({
          type: "back",
          size: "30",
          color: "#fff"
        }),
        c: common_vendor.o(returnAfterView),
        d: common_vendor.unref(statusHeight) + "rpx"
      } : {}, {
        e: common_vendor.unref(statusHeight) + "rpx",
        f: common_vendor.p({
          type: "search",
          color: "$999",
          size: "30"
        }),
        g: !common_vendor.unref(isSearch)
      }, !common_vendor.unref(isSearch) ? {} : {
        h: common_vendor.o(changeInput),
        i: valueSerch.value,
        j: common_vendor.o(($event) => valueSerch.value = $event.detail.value)
      }, {
        k: common_vendor.o(toSerch),
        l: common_vendor.unref(marg) + "rpx",
        m: common_vendor.unref(isSearch) ? "20rpx" : "",
        n: common_vendor.unref(statusHeight) + 80 + "rpx"
      });
    };
  }
};
wx.createComponent(_sfc_main);
