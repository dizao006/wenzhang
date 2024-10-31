"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_love2 = common_vendor.resolveComponent("love");
  _easycom_love2();
}
const _easycom_love = () => "../love/love.js";
if (!Math) {
  _easycom_love();
}
const _sfc_main = {
  __name: "listCard",
  props: ["list"],
  emits: ["saveSearchHistory"],
  setup(__props, { emit: __emit }) {
    let props = __props;
    const emit = __emit;
    async function goArticleDetail() {
      const {
        _id,
        title,
        author,
        create_time,
        thumbs_up_count,
        browse_count
      } = props.list;
      const parms = {
        _id,
        title,
        author,
        create_time,
        thumbs_up_count,
        browse_count
      };
      emit("saveSearchHistory");
      common_vendor.index.navigateTo({
        url: `/pages/articleDetail/articleDetail?options=${JSON.stringify(parms)}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(props).list.mode === "base"
      }, common_vendor.unref(props).list.mode === "base" ? {
        b: common_vendor.unref(props).list.cover[0] ? common_vendor.unref(props).list.cover[0] : "/static/img/logo.jpeg",
        c: common_vendor.t(common_vendor.unref(props).list.title),
        d: common_vendor.p({
          itemId: common_vendor.unref(props).list._id
        }),
        e: common_vendor.t(common_vendor.unref(props).list.classify),
        f: common_vendor.t(common_vendor.unref(props).list.browse_count),
        g: common_vendor.o(goArticleDetail)
      } : {}, {
        h: common_vendor.unref(props).list.mode === "column"
      }, common_vendor.unref(props).list.mode === "column" ? {
        i: common_vendor.t(common_vendor.unref(props).list.title),
        j: common_vendor.p({
          itemId: common_vendor.unref(props).list._id
        }),
        k: common_vendor.f(common_vendor.unref(props).list.cover.slice(0, 3), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        l: common_vendor.t(common_vendor.unref(props).list.classify),
        m: common_vendor.t(common_vendor.unref(props).list.browse_count),
        n: common_vendor.o(goArticleDetail)
      } : {}, {
        o: common_vendor.unref(props).list.mode === "image"
      }, common_vendor.unref(props).list.mode === "image" ? {
        p: common_vendor.unref(props).list.cover[0],
        q: common_vendor.t(common_vendor.unref(props).list.title),
        r: common_vendor.p({
          itemId: common_vendor.unref(props).list._id
        }),
        s: common_vendor.t(common_vendor.unref(props).list.classify),
        t: common_vendor.t(common_vendor.unref(props).list.browse_count),
        v: common_vendor.o(goArticleDetail)
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
