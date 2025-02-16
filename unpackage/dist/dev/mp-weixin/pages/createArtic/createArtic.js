"use strict";
const common_vendor = require("../../common/vendor.js");
const common_uuid = require("../../common/uuid.js");
const _sfc_main = {
  __name: "createArtic",
  setup(__props) {
    const store = common_vendor.useStore();
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    common_vendor.ref(false);
    common_vendor.ref("");
    common_vendor.ref("");
    let articId = common_uuid.generateArticleId();
    const goBack = async () => {
      common_vendor.index.showToast({
        title: "自动保存成功",
        icon: "success"
      });
      await save();
      content.value = "";
      title.value = "";
      articId = common_uuid.generateArticleId();
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const preview = async () => {
      await save();
      common_vendor.index.navigateTo({
        url: `/pages/preView/preView?id=${articId}`
      });
    };
    const save = () => {
      const md = new common_vendor.MarkdownIt();
      const html = md.render(content.value);
      const data = {
        id: articId,
        title: title.value,
        html
      };
      store.commit("addArticList", data);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.o(preview),
        c: common_vendor.o(save),
        d: title.value,
        e: common_vendor.o(($event) => title.value = $event.detail.value),
        f: content.value,
        g: common_vendor.o(($event) => content.value = $event.detail.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9deb6ff"]]);
wx.createPage(MiniProgramPage);
