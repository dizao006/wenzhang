"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _component_uni_section)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    common_vendor.ref(true);
    const store = common_vendor.useStore();
    const queueSize = common_vendor.ref("缓存大小0MB");
    function siginOut() {
      store.commit("updateUserInfo", null);
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
    function changeSun() {
      let body = document.querySelector("body");
      body.style.backgroundClor;
    }
    function goXiangxi() {
      console.log("test");
      common_vendor.index.navigateTo({
        url: "/pages/dataConfig/dataConfig"
      });
    }
    function goAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/Lianxi/Lianxi"
      });
    }
    function goZhanghu() {
      common_vendor.index.navigateTo({
        url: "/pages/accountConfig/accountConfig"
      });
    }
    function goHuan() {
      console.log("sss");
      try {
        common_vendor.index.clearStorageSync();
        common_vendor.index.showToast({
          title: "缓存清除成功",
          icon: "success"
        });
      } catch (err) {
        console.log("缓存同步清除失败：", err);
      }
    }
    common_vendor.onMounted(() => {
      common_vendor.index.getStorageInfo({
        success: (res) => {
          queueSize.value = `缓存大小                        ${(res.currentSize / (1024 * 1024)).toFixed(2)}MB`;
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showArrow: true,
          title: "编辑资料"
        }),
        b: common_vendor.o(goXiangxi),
        c: common_vendor.p({
          showArrow: true,
          title: "账号设置"
        }),
        d: common_vendor.o(goZhanghu),
        e: common_vendor.p({
          title: "深色模式"
        }),
        f: common_vendor.o((...args) => _ctx.goSun && _ctx.goSun(...args)),
        g: common_vendor.o(changeSun),
        h: common_vendor.p({
          showArrow: true,
          title: queueSize.value
        }),
        i: common_vendor.o(goHuan),
        j: common_vendor.p({
          rightText: "V1.0.0",
          showArrow: true,
          title: "当前版本"
        }),
        k: common_vendor.p({
          showArrow: true,
          title: "关于"
        }),
        l: common_vendor.o(goAbout),
        m: common_vendor.p({
          title: "显示右侧箭头",
          type: "line"
        }),
        n: common_vendor.o(siginOut)
      };
    };
  }
};
wx.createPage(_sfc_main);
