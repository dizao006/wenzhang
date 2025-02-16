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
    function siginOut() {
      store.commit("updateUserInfo", null);
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
    function changeSun() {
      console.log("测试黑暗模式");
    }
    function goXiangxi() {
      console.log("test");
      common_vendor.index.navigateTo({
        url: "/pages/dataConfig/dataConfig"
      });
    }
    function goZhanghu() {
      common_vendor.index.navigateTo({
        url: "/pages/accountConfig/accountConfig"
      });
    }
    function goXiaoxi() {
      common_vendor.index.navigateTo({
        url: "/pages/configxiaoxi/configxiaoxi"
      });
    }
    function goGuanli() {
      common_vendor.index.navigateTo({
        url: "/pages/guanli/guanli"
      });
    }
    function goHuan() {
    }
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
          showArrow: true,
          title: "消息设置"
        }),
        f: common_vendor.o(goXiaoxi),
        g: common_vendor.p({
          showArrow: true,
          title: "屏蔽管理"
        }),
        h: common_vendor.o(goGuanli),
        i: common_vendor.p({
          showArrow: true,
          title: "个性化推荐"
        }),
        j: common_vendor.o((...args) => _ctx.goGexi && _ctx.goGexi(...args)),
        k: common_vendor.p({
          title: "深色模式"
        }),
        l: common_vendor.o((...args) => _ctx.goSun && _ctx.goSun(...args)),
        m: common_vendor.o(changeSun),
        n: common_vendor.o(goHuan),
        o: common_vendor.p({
          showArrow: true,
          title: "缓存处理"
        }),
        p: common_vendor.p({
          rightText: "V1.0.0",
          showArrow: true,
          title: "当前版本"
        }),
        q: common_vendor.p({
          showArrow: true,
          title: "关于"
        }),
        r: common_vendor.p({
          title: "显示右侧箭头",
          type: "line"
        }),
        s: common_vendor.o(siginOut)
      };
    };
  }
};
wx.createPage(_sfc_main);
