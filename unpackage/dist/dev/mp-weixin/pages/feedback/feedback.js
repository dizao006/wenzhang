"use strict";
const common_vendor = require("../../common/vendor.js");
const common_isLogin = require("../../common/isLogin.js");
const ajax_api_interface_update_feedBack = require("../../ajax/api/interface/update_feedBack.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const store = common_vendor.useStore();
    const content = common_vendor.ref();
    const imageList = common_vendor.ref([]);
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    common_vendor.onLoad(async () => {
      await checkLogin();
    });
    async function _addImage() {
      const count = 5 - imageList.value.length;
      common_vendor.index.chooseImage({
        count,
        success(res) {
          const timpFilePath = res.tempFilePaths;
          timpFilePath.forEach((item, index) => {
            if (index < count) {
              imageList.value.push({
                url: item,
                name: res.tempFiles[index].name
              });
            }
          });
        }
      });
    }
    async function _submitFeedback() {
      if (!content.value) {
        common_vendor.index.showToast({
          title: "请输入反馈信息",
          icon: "error"
        });
        return;
      }
      common_vendor.index.showLoading();
      const feedBackImageList = await Promise.all(getFildId());
      common_vendor.index.hideLoading();
      await ajax_api_interface_update_feedBack.update_feedBack({
        content: content.value,
        userId: store.state.userInfo._id,
        feedBackImageList
      });
      common_vendor.index.showToast({
        title: "反馈成功"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/self/self"
        });
      }, 1e3);
    }
    function getFildId() {
      console.log("imageList.value", imageList.value);
      return imageList.value.map((item) => {
        return new Promise(async (reslove) => {
          const result = await common_vendor.Ys.uploadFile({
            filePath: item.url,
            cloudPath: item.name
          });
          reslove(result.fileID);
        });
      });
    }
    function removeImage(item) {
      imageList.value = imageList.value.filter((e) => e.url !== item.url);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: content.value,
        b: common_vendor.o(($event) => content.value = $event.detail.value),
        c: common_vendor.f(imageList.value, (item, index, i0) => {
          return {
            a: "a24b82f2-0-" + i0,
            b: common_vendor.o(($event) => removeImage(item), index),
            c: item.url,
            d: index
          };
        }),
        d: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#fff"
        }),
        e: imageList.value.length < 5
      }, imageList.value.length < 5 ? {
        f: common_vendor.p({
          type: "plusempty",
          size: "50",
          color: "#eee"
        }),
        g: common_vendor.o(_addImage)
      } : {}, {
        h: common_vendor.o(_submitFeedback)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a24b82f2"]]);
wx.createPage(MiniProgramPage);
