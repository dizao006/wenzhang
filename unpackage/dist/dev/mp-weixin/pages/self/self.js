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
    let isLocked = common_vendor.ref(false);
    common_vendor.onLoad(() => {
    });
    function goLoginPage() {
      common_vendor.index.navigateTo({
        url: "/pages/userinfo/login/login"
      });
    }
    function goDrafts() {
      common_vendor.index.navigateTo({
        url: "/pages/Drafts/Drafts"
      });
    }
    function goSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    }
    function goBk() {
      common_vendor.index.navigateTo({
        url: "/pages/Boke/Boke"
      });
    }
    function gotoAi() {
      common_vendor.index.navigateTo({
        url: "/pages/ai2/ai2"
      });
    }
    function goAccount() {
      common_vendor.index.navigateTo({
        url: "/pages/AccountUser/AccountUser"
      });
    }
    function goCalendar() {
      common_vendor.index.navigateTo({
        url: "/pages/Calendar/Calendar"
      });
    }
    function unlock() {
      isLocked.value = false;
    }
    function suoping() {
      isLocked.value = true;
    }
    function goVip() {
      common_vendor.index.navigateTo({
        url: "/pages/VipBuy/VipBuy"
      });
    }
    function goUser() {
      common_vendor.index.navigateTo({
        url: "/pages/InfoUser/InfoUser"
      });
    }
    function goGift() {
      common_vendor.index.navigateTo({
        url: "/pages/gift/gift"
      });
    }
    function goGame() {
      common_vendor.index.navigateTo({
        url: "/pages/Code/Code"
      });
    }
    function goFalg() {
      common_vendor.index.navigateTo({
        url: "/pages/Flag/Flag"
      });
    }
    function goGame2() {
      common_vendor.index.navigateTo({
        url: "/pages/game2/game2"
      });
    }
    function goLianxi() {
      common_vendor.index.navigateTo({
        url: "/pages/Lianxi/Lianxi"
      });
    }
    function goTuiGuang() {
      common_vendor.index.navigateTo({
        url: "/pages/TuiGuang/TuiGuang"
      });
    }
    function gotoMySelfArtic() {
      common_vendor.index.navigateTo({
        url: "/pages/game/game"
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
          const filePath = await uploadFi(
            res.tempFiles[0].path,
            res.tempFiles[0].name
          );
          let list = await common_vendor.Ys.getTempFileURL({
            fileList: [filePath]
          });
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
        a: common_vendor.unref(isLocked)
      }, common_vendor.unref(isLocked) ? {
        b: common_vendor.o(unlock)
      } : {}, {
        c: common_vendor.p({
          type: "scan",
          size: "25"
        }),
        d: common_vendor.p({
          type: "notification",
          size: "25"
        }),
        e: common_vendor.o(goSetting),
        f: common_vendor.p({
          type: "gear",
          size: "25"
        }),
        g: common_vendor.unref(store).state.userInfo
      }, common_vendor.unref(store).state.userInfo ? {
        h: common_vendor.unref(store).state.userInfo.avatar,
        i: common_vendor.o(changeAvatar),
        j: common_vendor.t(common_vendor.unref(store).state.userInfo.author_name),
        k: common_vendor.o((...args) => _ctx.changeName && _ctx.changeName(...args)),
        l: common_vendor.t(common_vendor.unref(store).state.userInfo.follow_count),
        m: common_vendor.t(common_vendor.unref(store).state.userInfo.fans_count),
        n: common_vendor.t(common_vendor.unref(store).state.userInfo.integral_count || 0)
      } : {}, {
        o: !common_vendor.unref(store).state.userInfo
      }, !common_vendor.unref(store).state.userInfo ? {
        p: common_assets._imports_0,
        q: common_vendor.p({
          type: "arrowright",
          size: "14",
          color: "#666"
        }),
        r: common_vendor.o(goLoginPage)
      } : {}, {
        s: common_vendor.p({
          size: "35px",
          color: "black",
          type: "calendar"
        }),
        t: common_vendor.o(goCalendar),
        v: common_vendor.p({
          size: "35px",
          color: "black",
          type: "vip"
        }),
        w: common_vendor.o(goVip),
        x: common_vendor.p({
          size: "35px",
          color: "black",
          type: "flag"
        }),
        y: common_vendor.o(goFalg),
        z: common_vendor.p({
          size: "35px",
          color: "black",
          type: "wallet"
        }),
        A: common_vendor.o(goAccount),
        B: common_vendor.p({
          type: "arrow-right"
        }),
        C: common_vendor.p({
          size: "35px",
          color: "black",
          type: "gift"
        }),
        D: common_vendor.o(goGift),
        E: common_vendor.p({
          size: "35px",
          color: "black",
          type: "medal"
        }),
        F: common_vendor.o(goGame),
        G: common_vendor.p({
          size: "35px",
          color: "black",
          type: "person"
        }),
        H: common_vendor.o(goUser),
        I: common_vendor.p({
          size: "35px",
          color: "black",
          type: "bars"
        }),
        J: common_vendor.o(goDrafts),
        K: common_vendor.p({
          size: "35px",
          color: "black",
          type: "eye"
        }),
        L: common_vendor.o(gotoMySelfArtic),
        M: common_vendor.p({
          size: "35px",
          color: "black",
          type: "fire"
        }),
        N: common_vendor.o(gotoAi),
        O: common_vendor.p({
          size: "35px",
          color: "black",
          type: "help"
        }),
        P: common_vendor.o(gotoFeedBack),
        Q: common_vendor.p({
          size: "35px",
          color: "black",
          type: "locked"
        }),
        R: common_vendor.o(suoping),
        S: common_vendor.p({
          size: "35px",
          color: "black",
          type: "map-pin-ellipse"
        }),
        T: common_vendor.o(goTuiGuang),
        U: common_vendor.p({
          size: "35px",
          color: "black",
          type: "phone"
        }),
        V: common_vendor.o(goLianxi),
        W: common_vendor.p({
          size: "35px",
          color: "black",
          type: "undo"
        }),
        X: common_vendor.o(goGame2),
        Y: common_vendor.p({
          size: "35px",
          color: "black",
          type: "paperclip"
        }),
        Z: common_vendor.o(goBk)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f94a969d"]]);
wx.createPage(MiniProgramPage);
