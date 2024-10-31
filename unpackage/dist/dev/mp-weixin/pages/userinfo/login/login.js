"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const ajax_api_user_login_user_login = require("../../../ajax/api/user_login/user_login.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_SendCode2 = common_vendor.resolveComponent("SendCode");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_SendCode2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_SendCode = () => "../../../components/SendCode/SendCode.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_SendCode + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const store = common_vendor.useStore();
    let fromData = common_vendor.ref({
      loginName: "",
      password: "",
      phone: "",
      vCode: ""
    });
    let userRules = {
      loginName: {
        rules: [
          {
            required: true,
            errorMessage: "用户名不能为空"
          },
          {
            validateFunction: SetloginName
          }
        ]
      },
      password: {
        rules: [{
          required: true,
          errorMessage: "密码不能为空"
        }, {
          validateFunction: SetPassword
        }]
      },
      phone: {
        rules: [{
          required: true,
          errorMessage: "手机号不能为空"
        }, {
          validateFunction: SetPhone
        }]
      },
      vCode: {
        rules: [{
          required: true,
          errorMessage: "验证码不能为空"
        }, {
          validateFunction: SetVcode
        }]
      }
    };
    let type = common_vendor.ref("account");
    let form = common_vendor.ref();
    let PhoneCode = common_vendor.ref();
    function changeType1() {
      type.value = "account";
      fromData.value.phone = "";
      fromData.value.vCode = "";
    }
    function changeType2() {
      type.value = "phone";
      fromData.value.loginName = "";
      fromData.value.password = "";
    }
    async function login() {
      let res = await form.value.validate();
      if (res.vCode && res.vCode != PhoneCode.value) {
        common_vendor.index.showToast({
          title: "验证码错误",
          icon: "none"
        });
        return;
      }
      submit({
        type: type.value,
        ...res
      });
    }
    function sendCodeData(data) {
      console.log(data);
      PhoneCode.value = data;
    }
    async function submit(formData) {
      const userInfo = await ajax_api_user_login_user_login.user_login(formData);
      if (userInfo) {
        store.commit("updateUserInfo", userInfo);
        common_vendor.index.showToast({
          title: "登陆成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } else {
        common_vendor.index.showToast({
          title: "账号或者密码错误",
          icon: "none"
        });
      }
    }
    function SetloginName(rule, val, data, callback) {
      switch (true) {
        case val.length < 6:
          callback("用户名长度不得小于六位");
        default:
          return true;
      }
    }
    function SetPassword(rule, val, data, callback) {
      switch (true) {
        case val.length < 6:
          callback("密码长度不得小于六位");
        default:
          return true;
      }
    }
    function SetPhone(rule, val, data, callback) {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      switch (true) {
        case !reg.test(val):
          callback("手机号格式不正确");
        default:
          return true;
      }
    }
    function SetVcode(rule, val, data, callback) {
      return true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(changeType1),
        c: common_vendor.n(common_vendor.unref(type) == "account" ? "active" : ""),
        d: common_vendor.o(changeType2),
        e: common_vendor.n(common_vendor.unref(type) != "account" ? "active" : ""),
        f: common_vendor.unref(type) == "account"
      }, common_vendor.unref(type) == "account" ? {
        g: common_vendor.unref(fromData).loginName,
        h: common_vendor.o(($event) => common_vendor.unref(fromData).loginName = $event.detail.value),
        i: common_vendor.p({
          label: "账号",
          name: "loginName"
        }),
        j: common_vendor.unref(fromData).password,
        k: common_vendor.o(($event) => common_vendor.unref(fromData).password = $event.detail.value),
        l: common_vendor.p({
          label: "密码",
          name: "password"
        })
      } : {
        m: common_vendor.unref(fromData).phone,
        n: common_vendor.o(($event) => common_vendor.unref(fromData).phone = $event.detail.value),
        o: common_vendor.p({
          label: "手机号",
          name: "phone"
        }),
        p: common_vendor.unref(fromData).vCode,
        q: common_vendor.o(($event) => common_vendor.unref(fromData).vCode = $event.detail.value),
        r: common_vendor.p({
          name: "vCode",
          label: "验证码"
        })
      }, {
        s: common_vendor.unref(type) == "phone"
      }, common_vendor.unref(type) == "phone" ? {
        t: common_vendor.p({
          form: common_vendor.unref(form),
          sendCodeData
        })
      } : {}, {
        v: common_vendor.o((...args) => login && login(...args)),
        w: common_vendor.sr(form, "47d7a160-0", {
          "k": "form"
        }),
        x: common_vendor.p({
          modelValue: common_vendor.unref(fromData),
          rules: common_vendor.unref(userRules)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-47d7a160"]]);
wx.createPage(MiniProgramPage);
