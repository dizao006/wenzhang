"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_user_login_phone = require("../../ajax/api/user_login/phone.js");
const _sfc_main = {
  __name: "SendCode",
  props: ["form", "sendCodeData"],
  setup(__props) {
    let {
      form,
      sendCodeData
    } = __props;
    common_vendor.onUnmounted(() => {
      clearInterval(timeId.value);
      time.value = 6;
      timeId.value = null;
      staus.value = false;
    });
    let timeId = common_vendor.ref(null);
    let time = common_vendor.ref(6);
    let staus = common_vendor.ref(false);
    async function sendCode() {
      const {
        phone
      } = await form.validateField(["phone"]);
      if (!staus.value) {
        timeEnd();
      }
      const res = await ajax_api_user_login_phone.phone({
        phone
      });
      common_vendor.index.showToast({
        title: "发送成功，请注意查收验证码",
        icon: "none"
      });
      sendCodeData(res);
    }
    function timeEnd() {
      console.log(time.value);
      staus.value = true;
      timeId.value = setInterval(() => {
        if (time.value == 1) {
          clearInterval(timeId.value);
          time.value = 6;
          timeId.value = null;
          staus.value = false;
          return;
        }
        time.value--;
        console.log(time.value);
      }, 1e3);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(!common_vendor.unref(staus) ? "获取验证码" : `${common_vendor.unref(time)}后重新获取`),
        b: common_vendor.o(sendCode)
      };
    };
  }
};
wx.createComponent(_sfc_main);
