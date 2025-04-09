"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_user_login_updatePwd = require("../../ajax/api/user_login/updatePwd.js");
const _sfc_main = {
  name: "changePwd",
  data() {
    return {
      errShow: false,
      errMsg: "错误",
      newPwd: "",
      newPwds: "",
      store: common_vendor.useStore()
    };
  },
  methods: {
    showErr(msg) {
      this.errShow = true;
      this.errMsg = msg;
      setTimeout(() => {
        this.errShow = false;
      }, 2e3);
    },
    async confirm() {
      let reg = /^[0-9a-zA-Z_]{1,}$/;
      if (!reg.test(this.newPwd)) {
        this.showErr("密码长度6-12位，可以由字母数字_构成");
        return;
      }
      if (this.newPwd !== this.newPwds) {
        this.showErr("两次输入密码不一致，请重新输入");
        return;
      }
      if (this.newPwd.length < 6 || this.newPwd.length > 12) {
        this.showErr("密码长度为6~12位！");
        return;
      }
      let res = await ajax_api_user_login_updatePwd.updatePwd({
        pwd: this.newPwd,
        id: this.store.state.userInfo._id
      });
      if (res.code == 0) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "success"
        });
      }
      this.store.commit("updateUserInfo", res.result);
      common_vendor.index.switchTab({
        url: "/pages/self/self"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.newPwd,
    b: common_vendor.o(($event) => $data.newPwd = $event.detail.value),
    c: $data.newPwds,
    d: common_vendor.o(($event) => $data.newPwds = $event.detail.value),
    e: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    f: common_vendor.t($data.errMsg),
    g: common_vendor.n($data.errShow ? "errShow" : "err")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2bcf7402"]]);
wx.createPage(MiniProgramPage);
