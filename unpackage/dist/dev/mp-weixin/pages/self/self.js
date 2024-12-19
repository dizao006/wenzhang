"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const ajax_api_interface_AvatarUpdate = require("../../ajax/api/interface/AvatarUpdate.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "self",
  setup(__props) {
    common_vendor.ref("1.0.0");
    common_vendor.ref(false);
    const store = common_vendor.useStore();
    common_vendor.onLoad(() => {
    });
    function goLoginPage() {
      common_vendor.index.navigateTo({
        url: "/pages/userinfo/login/login"
      });
    }
    function siginOut() {
      store.commit("updateUserInfo", null);
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    }
    function gotoMySelfArtic() {
      common_vendor.index.navigateTo({
        url: "/pages/myArticle/myArticle"
      });
    }
    function gotoFeedBack() {
      common_vendor.index.navigateTo({
        url: "/pages/feedback/feedback"
      });
    }
    function changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: async (res) => {
          const filePath = await uploadFi(res.tempFiles[0].path, res.tempFiles[0].name);
          let list = await common_vendor.Ys.getTempFileURL({
            fileList: [filePath]
          });
          console.log(list.fileList[0].tempFileURL);
          await updateAvatar(list.fileList[0].tempFileURL);
        }
      });
    }
    async function uploadFi(filePath, cloudPath) {
      const folderName = "avatar/";
      const fileName = cloudPath;
      const fullCloudPath = folderName + fileName;
      const result = await common_vendor.Ys.uploadFile({
        filePath,
        cloudPath: fullCloudPath
      });
      return result.fileID;
    }
    async function updateAvatar(filePathId) {
      await ajax_api_interface_AvatarUpdate.AvatarUpdate({
        userId: store.state.userInfo._id,
        filePath: filePathId
      });
      common_vendor.index.showToast({
        title: "上传成功"
      });
      store.commit("updateUserInfo", {
        ...store.state.userInfo,
        avatar: filePathId
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(store).state.userInfo
      }, common_vendor.unref(store).state.userInfo ? {
        b: common_vendor.unref(store).state.userInfo.avatar,
        c: common_vendor.unref(store).state.userInfo.avatar,
        d: common_vendor.o(changeAvatar),
        e: common_vendor.t(common_vendor.unref(store).state.userInfo.author_name),
        f: common_vendor.o((...args) => _ctx.changeName && _ctx.changeName(...args)),
        g: common_vendor.t(common_vendor.unref(store).state.userInfo.follow_count),
        h: common_vendor.t(common_vendor.unref(store).state.userInfo.fans_count),
        i: common_vendor.t(common_vendor.unref(store).state.userInfo.integral_count || 0)
      } : {}, {
        j: !common_vendor.unref(store).state.userInfo
      }, !common_vendor.unref(store).state.userInfo ? {
        k: common_assets._imports_0,
        l: common_vendor.p({
          type: "arrowright",
          size: "14",
          color: "#666"
        }),
        m: common_vendor.o(goLoginPage)
      } : {}, {
        n: common_vendor.p({
          type: "contact",
          size: "16",
          color: "#666"
        }),
        o: common_vendor.p({
          type: "arrowright",
          size: "14",
          color: "#666"
        }),
        p: common_vendor.o(gotoMySelfArtic),
        q: common_vendor.p({
          type: "help",
          size: "16",
          color: "#666"
        }),
        r: common_vendor.p({
          type: "arrowright",
          size: "14",
          color: "#666"
        }),
        s: common_vendor.o(gotoFeedBack),
        t: common_vendor.unref(store).state.userInfo
      }, common_vendor.unref(store).state.userInfo ? {
        v: common_vendor.o(siginOut)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f94a969d"]]);
wx.createPage(MiniProgramPage);
