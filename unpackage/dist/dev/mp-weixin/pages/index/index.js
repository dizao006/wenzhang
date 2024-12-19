"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_home = require("../../ajax/api/interface/home.js");
const common_isLogin = require("../../common/isLogin.js");
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
    let activeIndex = common_vendor.ref(0);
    const store = common_vendor.useStore();
    const shoTbale = common_vendor.ref();
    function changeIndex(val) {
      activeIndex.value = val;
    }
    const allList = common_vendor.ref();
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    common_vendor.onLoad(async () => {
      await checkLogin();
    });
    common_vendor.onMounted(async () => {
      allList.value = await ajax_api_interface_home.getLableList();
      allList.value = [{
        name: "全部"
      }, ...allList.value];
      store.commit("setlabelList", allList.value);
    });
    common_vendor.watch(() => store.state.labelListItem, (n, v) => {
      shoTbale.value = [{
        name: "全部"
      }, ...n];
    }, {
      immediate: true,
      deep: true
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeIndex),
        b: common_vendor.p({
          labeList: shoTbale.value.length > 1 ? shoTbale.value : allList.value,
          activeIndex: common_vendor.unref(activeIndex)
        }),
        c: common_vendor.o(changeIndex),
        d: common_vendor.p({
          artList: shoTbale.value.length > 1 ? shoTbale.value : allList.value,
          activeIndex: common_vendor.unref(activeIndex)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
