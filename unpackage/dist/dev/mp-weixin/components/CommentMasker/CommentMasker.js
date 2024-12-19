"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "CommentMasker",
  props: ["isshow"],
  emits: ["closeShow", "sendDataComent"],
  setup(__props, { emit: __emit }) {
    const popup = common_vendor.ref();
    const props = __props;
    const emit = __emit;
    const commentValue = common_vendor.ref();
    common_vendor.watch(() => props.isshow, (n) => {
      if (n) {
        popup.value.open();
      } else {
        popup.value.close();
      }
    });
    function closeFA() {
      emit("closeShow");
    }
    async function sendComentData() {
      if (commentValue.value == "")
        return;
      emit("sendDataComent", commentValue.value);
      commentValue.value = "";
    }
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.o(closeFA),
        b: common_vendor.o(sendComentData),
        c: commentValue.value,
        d: common_vendor.o(common_vendor.m(($event) => commentValue.value = $event.detail.value, {
          trim: true
        })),
        e: common_vendor.t(200 - (((_a = commentValue.value) == null ? void 0 : _a.length) ? (_b = commentValue.value) == null ? void 0 : _b.length : 0)),
        f: common_vendor.sr(popup, "79fda5a8-0", {
          "k": "popup"
        }),
        g: common_vendor.p({
          ["mask-click"]: false,
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79fda5a8"]]);
wx.createComponent(Component);
