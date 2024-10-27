"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_home = require("../../ajax/api/interface/home.js");
require("../../ajax/http.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  const _easycom_ArticleList2 = common_vendor.resolveComponent("ArticleList");
  (_easycom_NavBar2 + _easycom_TabBar2 + _easycom_ArticleList2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
const _easycom_ArticleList = () => "../../components/ArticleList/ArticleList.js";
if (!Math) {
  (_easycom_NavBar + _easycom_TabBar + _easycom_ArticleList)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let arr = common_vendor.ref([]);
    let activeIndex = common_vendor.ref(0);
    function changeIndex(val) {
      activeIndex.value = val;
    }
    common_vendor.onMounted(async () => {
      const list = await ajax_api_interface_home.getLableList();
      arr.value = [{
        name: "全部"
      }, ...list];
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeIndex),
        b: common_vendor.p({
          labeList: common_vendor.unref(arr),
          activeIndex: common_vendor.unref(activeIndex)
        }),
        c: common_vendor.o(changeIndex),
        d: common_vendor.p({
          artList: common_vendor.unref(arr),
          activeIndex: common_vendor.unref(activeIndex)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
