"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "preView",
  setup(__props) {
    const store = common_vendor.useStore();
    const htmlContent = common_vendor.ref("");
    common_vendor.onMounted(() => {
      const articleId = common_vendor.index.getStorageSync("currentArticleId");
      const article = store.state.articList.find((item) => item.id === articleId);
      if (article) {
        htmlContent.value = article.html;
      } else {
        common_vendor.index.showToast({
          title: "文章未找到",
          icon: "none"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: htmlContent.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18cea5aa"]]);
wx.createPage(MiniProgramPage);
