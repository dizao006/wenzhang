"use strict";
const common_vendor = require("../../common/vendor.js");
const common_isLogin = require("../../common/isLogin.js");
const ajax_api_interface_getArticFloow = require("../../ajax/api/interface/getArticFloow.js");
const ajax_api_interface_getAuthorLists = require("../../ajax/api/interface/getAuthorLists.js");
if (!Array) {
  const _easycom_ListItem2 = common_vendor.resolveComponent("ListItem");
  _easycom_ListItem2();
}
const _easycom_ListItem = () => "../../components/ListItem/ListItem.js";
if (!Math) {
  (_easycom_ListItem + AuthorList)();
}
const AuthorList = () => "../../components/AuthorList/AuthorList.js";
const _sfc_main = {
  __name: "follow",
  setup(__props) {
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    const store = common_vendor.useStore();
    const articleList = common_vendor.ref([]);
    const isLoadMore = common_vendor.ref(true);
    const dataNone = common_vendor.ref(false);
    const authorDataNone = common_vendor.ref(false);
    const currentIndex = common_vendor.ref(0);
    const authorList = common_vendor.ref([]);
    common_vendor.index.$on("updateArticle", () => {
      getArticTxt();
    });
    common_vendor.index.$on("updatefellow", () => {
      getAuthorList();
    });
    common_vendor.onLoad(async () => {
      await checkLogin();
      await getArticTxt();
      await getAuthorList();
    });
    async function getArticTxt() {
      const res = await ajax_api_interface_getArticFloow.getArticFloow({
        userId: store.state.userInfo._id
      });
      if (res.length == 0) {
        dataNone.value = true;
      }
      isLoadMore.value = false;
      articleList.value = res;
    }
    async function getAuthorList() {
      const list = await ajax_api_interface_getAuthorLists.getAuthorLists({
        userId: store.state.userInfo._id
      });
      if (list.length == 0) {
        authorDataNone.value = true;
      }
      authorList.value = list;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentIndex.value === 0 ? 1 : "",
        b: common_vendor.o(($event) => currentIndex.value = 0),
        c: currentIndex.value === 1 ? 1 : "",
        d: common_vendor.o(($event) => currentIndex.value = 1),
        e: articleList.value.length
      }, articleList.value.length ? {
        f: common_vendor.p({
          isLoadMore: isLoadMore.value,
          articleList: articleList.value
        })
      } : {}, {
        g: dataNone.value
      }, dataNone.value ? {} : {}, {
        h: common_vendor.p({
          authorList: authorList.value
        }),
        i: authorDataNone.value
      }, authorDataNone.value ? {} : {}, {
        j: currentIndex.value,
        k: common_vendor.o(($event) => currentIndex.value = $event.detail.current)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-89055799"]]);
wx.createPage(MiniProgramPage);
