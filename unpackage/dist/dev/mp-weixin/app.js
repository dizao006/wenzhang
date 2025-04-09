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
  "./pages/createArtic/createArtic.js";
  "./pages/preView/preView.js";
  "./pages/Calendar/Calendar.js";
  "./pages/VipBuy/VipBuy.js";
  "./pages/gift/gift.js";
  "./pages/setting/setting.js";
  "./pages/dataConfig/dataConfig.js";
  "./pages/accountConfig/accountConfig.js";
  "./pages/configxiaoxi/configxiaoxi.js";
  "./pages/guanli/guanli.js";
  "./pages/Flag/Flag.js";
  "./pages/TuiGuang/TuiGuang.js";
  "./pages/Lianxi/Lianxi.js";
  "./pages/game/game.js";
  "./pages/game2/game2.js";
  "./pages/InfoUser/InfoUser.js";
  "./pages/AccountUser/AccountUser.js";
  "./pages/Boke/Boke.js";
  "./pages/Drafts/Drafts.js";
  "./pages/articPush/articPush.js";
  "./pages/Ai/Ai.js";
  "./pages/ai2/ai2.js";
  "./pages/Code/Code.js";
  "./pages/xj/xj.js";
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
const uniPopup = () => "./uni_modules/uni-popup/components/uni-popup/uni-popup.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("uni-popup", uniPopup);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
