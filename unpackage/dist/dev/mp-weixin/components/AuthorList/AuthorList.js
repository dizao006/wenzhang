"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "AuthorList",
  props: {
    authorList: Array
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.authorList, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar : "../../static/img/info.jpg",
            b: common_vendor.t(item.author_name),
            c: common_vendor.t(item.professional),
            d: common_vendor.t(item.article_ids.length),
            e: common_vendor.t(item.fans_count),
            f: item._id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0126b504"]]);
wx.createComponent(Component);
