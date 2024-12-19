"use strict";
const common_vendor = require("../../common/vendor.js");
const common_isLogin = require("../../common/isLogin.js");
const ajax_api_interface_getArticleMyList = require("../../ajax/api/interface/getArticleMyList.js");
if (!Math) {
  listCard();
}
const listCard = () => "../../components/listCard/listCard.js";
const _sfc_main = {
  __name: "myArticle",
  setup(__props) {
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    const store = common_vendor.useStore();
    const articleList = common_vendor.ref({});
    const isNoData = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      await checkLogin();
      await getMyArticleList();
    });
    async function getMyArticleList() {
      const list = await ajax_api_interface_getArticleMyList.getArticleMyList({
        userId: store.state.userInfo._id
      });
      articleList.value = list;
      if (list.length > 0) {
        isNoData.value = true;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(articleList.value, (list, k0, i0) => {
          return {
            a: list._id,
            b: "007012f9-0-" + i0,
            c: common_vendor.p({
              list
            })
          };
        }),
        b: isNoData.value
      }, isNoData.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-007012f9"]]);
wx.createPage(MiniProgramPage);
