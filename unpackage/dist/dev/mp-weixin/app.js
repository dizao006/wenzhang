"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/follow/follow.js";
  "./pages/self/self.js";
  "./pages/serch/serch.js";
  "./pages/userinfo/login/login.js";
  "./pages/abelAdmin/abelAdmin.js";
  "./pages/articleDetail/articleDetail.js";
  "./pages/commentList/commentList.js";
  "./pages/myArticle/myArticle.js";
  "./pages/feedback/feedback.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
