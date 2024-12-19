"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_getCommentData = require("../../ajax/api/interface/getCommentData.js");
const ajax_api_interface_updateComent = require("../../ajax/api/interface/updateComent.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_CommentMasker2 = common_vendor.resolveComponent("CommentMasker");
  (_easycom_uni_load_more2 + _easycom_CommentMasker2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_CommentMasker = () => "../../components/CommentMasker/CommentMasker.js";
if (!Math) {
  (commentBoxVue + _easycom_uni_load_more + _easycom_CommentMasker)();
}
const commentBoxVue = () => "../../components/comment-box/commentBox.js";
const _sfc_main = {
  __name: "commentList",
  setup(__props) {
    const articId = common_vendor.ref();
    const commentList = common_vendor.ref([]);
    const pageSize = common_vendor.ref(5);
    const page = common_vendor.ref(1);
    const loading = common_vendor.ref("loading");
    const isShow = common_vendor.ref(false);
    const store = common_vendor.useStore();
    const repalyData = common_vendor.ref({});
    common_vendor.onLoad(async (props) => {
      articId.value = props.id;
      await getCommentList();
    });
    async function getCommentList() {
      let res = await ajax_api_interface_getCommentData.getCommentData({
        articleId: articId.value,
        pageSize: pageSize.value,
        page: page.value
      });
      if (res.length == 0) {
        loading.value = "noMore";
        return;
      }
      let oldList = JSON.parse(JSON.stringify(commentList.value));
      oldList.push(...res);
      commentList.value = oldList;
    }
    function repalyComment(data) {
      closeShow();
      repalyData.value = {
        "comment_id": data.comment.comment_id,
        isRepaly: data.isRepaly
      };
      data.comment.repaly_id && (repalyData.value.repaly_id = data.comment.repaly_id);
    }
    common_vendor.onReachBottom(() => {
      if (loading.value === "noMore")
        return;
      page.value++;
      getCommentList();
    });
    function closeShow() {
      isShow.value = !isShow.value;
    }
    async function sendDataComent(data) {
      await ajax_api_interface_updateComent.updateComent({
        userId: store.state.userInfo._id,
        articleId: articId.value,
        content: data,
        ...repalyData.value
      });
      common_vendor.index.showToast({
        title: "发布成功"
      });
      closeShow();
      repalyData.value = {};
      page.value = 1;
      commentList.value = [];
      loading.value = "loading";
      await getCommentList();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(commentList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(repalyComment, item._id),
            b: "4d0186b5-0-" + i0,
            c: common_vendor.p({
              commentData: item
            }),
            d: item._id
          };
        }),
        b: commentList.value.length === 0 || commentList.value.length > 5
      }, commentList.value.length === 0 || commentList.value.length > 5 ? {
        c: common_vendor.p({
          contentText: {
            contentdown: "上拉加载更多",
            contentrefresh: "正在加载....",
            contentnomore: "暂无更多评论"
          },
          status: loading.value
        })
      } : {}, {
        d: common_vendor.o(closeShow),
        e: common_vendor.o(sendDataComent),
        f: common_vendor.p({
          isshow: isShow.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d0186b5"]]);
wx.createPage(MiniProgramPage);
