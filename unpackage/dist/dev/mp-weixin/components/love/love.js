"use strict";
const common_vendor = require("../../common/vendor.js");
const common_isLogin = require("../../common/isLogin.js");
const ajax_api_interface_updateLike = require("../../ajax/api/interface/updateLike.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "love",
  props: ["itemId"],
  setup(__props) {
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    let {
      itemId
    } = __props;
    const userInfo = common_vendor.ref();
    const store = common_vendor.useStore();
    common_vendor.onMounted(async () => {
      userInfo.value = await checkLogin();
    });
    const isSave = common_vendor.computed(() => {
      return userInfo.value && userInfo.value.article_likes_ids.includes(itemId);
    });
    async function changeSaveHeart(e) {
      e.stopPropagation();
      try {
        let user = await checkLogin();
        const {
          msg,
          newUserInfo
        } = await ajax_api_interface_updateLike.updateLike({
          articleId: itemId,
          userId: user._id
        });
        userInfo.value = newUserInfo;
        store.commit("updateUserInfo", newUserInfo);
        common_vendor.index.showToast({
          title: msg,
          icon: "success"
        });
      } catch (error) {
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: isSave.value ? "heart-filled" : "heart",
          color: "$ff6600",
          size: "24"
        }),
        b: common_vendor.o(($event) => changeSaveHeart($event))
      };
    };
  }
};
wx.createComponent(_sfc_main);
