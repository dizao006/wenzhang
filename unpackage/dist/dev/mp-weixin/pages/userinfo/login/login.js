"use strict";
const common_vendor = require("../../../common/vendor.js");
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
    let fromData = common_vendor.ref({
      loginName: "",
      password: "",
      phone: "",
      vCode: ""
    });
    let type = common_vendor.ref("account");
    function changeType1() {
      type.value = "account";
    }
    function changeType2() {
      type.value = "phone";
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeType1),
        b: common_vendor.n(common_vendor.unref(type) == "account" ? "active" : ""),
        c: common_vendor.o(changeType2),
        d: common_vendor.n(common_vendor.unref(type) != "account" ? "active" : ""),
        e: common_vendor.unref(type) == "account"
      }, common_vendor.unref(type) == "account" ? {
        f: common_vendor.unref(fromData).loginName,
        g: common_vendor.o(($event) => common_vendor.unref(fromData).loginName = $event.detail.value),
        h: common_vendor.p({
          label: "账号",
          name: "loginName"
        }),
        i: common_vendor.unref(fromData).password,
        j: common_vendor.o(($event) => common_vendor.unref(fromData).password = $event.detail.value),
        k: common_vendor.p({
          label: "密码",
          name: "password"
        })
      } : {
        l: common_vendor.unref(fromData).phone,
        m: common_vendor.o(($event) => common_vendor.unref(fromData).phone = $event.detail.value),
        n: common_vendor.p({
          label: "手机号",
          name: "phone"
        }),
        o: common_vendor.unref(fromData).vCode,
        p: common_vendor.o(($event) => common_vendor.unref(fromData).vCode = $event.detail.value),
        q: common_vendor.p({
          label: "验证码",
          name: "vCode"
        })
      }, {
        r: common_vendor.unref(type) == "phone"
      }, common_vendor.unref(type) == "phone" ? {} : {}, {
        s: common_vendor.sr("form", "47d7a160-0"),
        t: common_vendor.p({
          modelValue: common_vendor.unref(fromData),
          rules: _ctx.userRules
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-47d7a160"], ["__file", "C:/Users/22216/Desktop/vue/移动端/项目/project1/pages/userinfo/login/login.vue"]]);
wx.createPage(MiniProgramPage);
