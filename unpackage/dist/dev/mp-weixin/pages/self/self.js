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
    function goSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    }
    function goCalendar() {
      common_vendor.index.navigateTo({
        url: "/pages/Calendar/Calendar"
      });
    }
    function goVip() {
      common_vendor.index.navigateTo({
        url: "/pages/VipBuy/VipBuy"
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
        a: common_vendor.p({
          type: "scan",
          size: "25"
        }),
        b: common_vendor.p({
          type: "notification",
          size: "25"
        }),
        c: common_vendor.o(goSetting),
        d: common_vendor.p({
          type: "gear",
          size: "25"
        }),
        e: common_vendor.unref(store).state.userInfo
      }, common_vendor.unref(store).state.userInfo ? {
        f: common_vendor.unref(store).state.userInfo.avatar,
        g: common_vendor.o(changeAvatar),
        h: common_vendor.t(common_vendor.unref(store).state.userInfo.author_name),
        i: common_vendor.o((...args) => _ctx.changeName && _ctx.changeName(...args)),
        j: common_vendor.t(common_vendor.unref(store).state.userInfo.follow_count),
        k: common_vendor.t(common_vendor.unref(store).state.userInfo.fans_count),
        l: common_vendor.t(common_vendor.unref(store).state.userInfo.integral_count || 0)
      } : {}, {
        m: !common_vendor.unref(store).state.userInfo
      }, !common_vendor.unref(store).state.userInfo ? {
        n: common_assets._imports_0,
        o: common_vendor.p({
          type: "arrowright",
          size: "14",
          color: "#666"
        }),
        p: common_vendor.o(goLoginPage)
      } : {}, {
        q: common_vendor.p({
          size: "35px",
          color: "black",
          type: "calendar"
        }),
        r: common_vendor.o(goCalendar),
        s: common_vendor.p({
          size: "35px",
          color: "black",
          type: "vip"
        }),
        t: common_vendor.o(goVip),
        v: common_vendor.p({
          size: "35px",
          color: "black",
          type: "flag"
        }),
        w: common_vendor.p({
          size: "35px",
          color: "black",
          type: "wallet"
        }),
        x: common_vendor.p({
          type: "arrow-right"
        }),
        y: common_vendor.p({
          size: "35px",
          color: "black",
          type: "gift"
        }),
        z: common_vendor.p({
          size: "35px",
          color: "black",
          type: "medal"
        }),
        A: common_vendor.p({
          size: "35px",
          color: "black",
          type: "person"
        }),
        B: common_vendor.p({
          size: "35px",
          color: "black",
          type: "bars"
        }),
        C: common_vendor.p({
          size: "35px",
          color: "black",
          type: "eye"
        }),
        D: common_vendor.o(gotoMySelfArtic),
        E: common_vendor.p({
          size: "35px",
          color: "black",
          type: "fire"
        }),
        F: common_vendor.p({
          size: "35px",
          color: "black",
          type: "help"
        }),
        G: common_vendor.o(gotoFeedBack),
        H: common_vendor.p({
          size: "35px",
          color: "black",
          type: "locked"
        }),
        I: common_vendor.p({
          size: "35px",
          color: "black",
          type: "map-pin-ellipse"
        }),
        J: common_vendor.p({
          size: "35px",
          color: "black",
          type: "phone"
        }),
        K: common_vendor.p({
          size: "35px",
          color: "black",
          type: "undo"
        }),
        L: common_vendor.p({
          size: "35px",
          color: "black",
          type: "paperclip"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f94a969d"]]);
wx.createPage(MiniProgramPage);
