"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_commentBox = common_vendor.resolveComponent("commentBox");
  (_easycom_uni_dateformat2 + _component_commentBox)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
const _sfc_main = {
  __name: "commentBox",
  props: {
    commentData: {
      type: Object,
      default: () => ({})
      // 默认值是一个空对象
    },
    isRepaly: {
      type: Boolean,
      default: false
      // 默认值为 false
    }
  },
  emits: ["repalyComment"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function commentRepaly(data) {
      console.log(data, "sss");
      if (data.isRepaly) {
        data.comment.repaly_id = data.comment.comment_id;
        data.comment.comment_id = props.commentData.comment_id;
      }
      emit("repalyComment", data);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.commentData.author.avatar,
        b: !props.commentData.isRepaly
      }, !props.commentData.isRepaly ? {
        c: common_vendor.t(props.commentData.author.author_name)
      } : {
        d: common_vendor.t(props.commentData.author.author_name),
        e: common_vendor.t(props.commentData.to)
      }, {
        f: common_vendor.p({
          date: props.commentData.createTime,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: common_vendor.t(props.commentData.content),
        h: common_vendor.o(($event) => commentRepaly({
          comment: __props.commentData,
          isRepaly: __props.isRepaly
        })),
        i: common_vendor.f(props.commentData.replay, (item, k0, i0) => {
          return {
            a: common_vendor.o(commentRepaly, item.comment_id),
            b: "0bd4c8b0-1-" + i0,
            c: common_vendor.p({
              isRepaly: true,
              commentData: item
            }),
            d: item.comment_id
          };
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0bd4c8b0"]]);
wx.createComponent(Component);
