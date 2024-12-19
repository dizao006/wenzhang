"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_updateComent = require("../../ajax/api/interface/updateComent.js");
const ajax_api_interface_getAarticleDetatil = require("../../ajax/api/interface/getAarticleDetatil.js");
const common_isLogin = require("../../common/isLogin.js");
const ajax_api_interface_getCommentData = require("../../ajax/api/interface/getCommentData.js");
const ajax_api_interface_updateFollow = require("../../ajax/api/interface/updateFollow.js");
const ajax_api_interface_updateGoodOk = require("../../ajax/api/interface/updateGoodOk.js");
if (!Array) {
  const _easycom_uv_parse2 = common_vendor.resolveComponent("uv-parse");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_CommentMasker2 = common_vendor.resolveComponent("CommentMasker");
  (_easycom_uv_parse2 + _easycom_uni_icons2 + _easycom_CommentMasker2)();
}
const _easycom_uv_parse = () => "../../uni_modules/uv-parse/components/uv-parse/uv-parse.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_CommentMasker = () => "../../components/CommentMasker/CommentMasker.js";
if (!Math) {
  (_easycom_uv_parse + commentBoxVue + _easycom_uni_icons + love + _easycom_CommentMasker)();
}
const love = () => "../../components/love/love.js";
const commentBoxVue = () => "../../components/comment-box/commentBox.js";
const _sfc_main = {
  __name: "articleDetail",
  setup(__props) {
    const store = common_vendor.useStore();
    const {
      checkLogin
    } = common_isLogin.useIsLoggedIn();
    const Parms = common_vendor.ref();
    const isShow = common_vendor.ref(false);
    const commentList = common_vendor.ref({});
    const repalyData = common_vendor.ref();
    async function getcommentList() {
      let res = await ajax_api_interface_getCommentData.getCommentData({
        articleId: Parms.value._id
      });
      return res;
    }
    async function openShow() {
      await checkLogin();
      isShow.value = !isShow.value;
    }
    function closeShow() {
      isShow.value = !isShow.value;
    }
    async function sendDataComent(data) {
      await ajax_api_interface_updateComent.updateComent({
        userId: store.state.userInfo._id,
        articleId: Parms.value._id,
        content: data,
        ...repalyData.value
      });
      common_vendor.index.showToast({
        title: "发布成功"
      });
      closeShow();
      repalyData.value = {};
      commentList.value = await getcommentList();
    }
    common_vendor.onLoad(async (options) => {
      const res = JSON.parse(JSON.stringify(options.options));
      let data = await ajax_api_interface_getAarticleDetatil.getAarticleDetatil({
        articleId: res._id
      });
      Parms.value = data;
      Parms.value.browse_count++;
      commentList.value = await getcommentList();
    });
    const content = common_vendor.computed(() => {
      var _a, _b;
      return ((_a = Parms == null ? void 0 : Parms.value) == null ? void 0 : _a.content) ? common_vendor.marked((_b = Parms == null ? void 0 : Parms.value) == null ? void 0 : _b.content) : null;
    });
    function repalyComment(data) {
      closeShow();
      repalyData.value = {
        "comment_id": data.comment.comment_id,
        isRepaly: data.isRepaly
      };
      data.comment.repaly_id && (repalyData.value.repaly_id = data.comment.repaly_id);
    }
    const isFllow = common_vendor.computed(() => {
      var _a;
      return store.state.userInfo.author_likes_ids.includes((_a = Parms.value) == null ? void 0 : _a.author.id);
    });
    async function followAuthor() {
      var _a, _b, _c;
      await checkLogin();
      const res = await ajax_api_interface_updateFollow.updateFollow({
        authorId: (_a = Parms.value) == null ? void 0 : _a.author.id,
        userId: store.state.userInfo._id
      });
      common_vendor.index.showToast({
        title: res.msg
      });
      let follwIds = [...store.state.userInfo.author_likes_ids];
      if (follwIds.includes((_b = Parms.value) == null ? void 0 : _b.author.id)) {
        follwIds = follwIds.filter((e) => {
          var _a2;
          return e != ((_a2 = Parms.value) == null ? void 0 : _a2.author.id);
        });
      } else {
        follwIds.push((_c = Parms.value) == null ? void 0 : _c.author.id);
      }
      common_vendor.index.$emit("updatefellow");
      store.commit("updateUserInfo", {
        ...store.state.userInfo,
        author_likes_ids: follwIds
      });
    }
    const isGood = common_vendor.computed(() => {
      var _a;
      return store.state.userInfo.thumbs_up_article_ids.includes((_a = Parms.value) == null ? void 0 : _a._id);
    });
    async function setGoodOk() {
      await checkLogin();
      await ajax_api_interface_updateGoodOk.updateGoodOk({
        articId: Parms.value._id,
        userId: store.state.userInfo._id
      });
      let isGoodOks = [...store.state.userInfo.thumbs_up_article_ids];
      if (isGoodOks.includes(Parms.value._id)) {
        isGoodOks = isGoodOks.filter((e) => e !== Parms.value._id);
        Parms.value.thumbs_up_count--;
      } else {
        isGoodOks.push(Parms.value._id);
        Parms.value.thumbs_up_count++;
      }
      store.commit("updateUserInfo", {
        ...store.state.userInfo,
        thumbs_up_article_ids: isGoodOks
      });
    }
    function goComment() {
      common_vendor.index.navigateTo({
        url: `/pages/commentList/commentList?id=${Parms.value._id}`
      });
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.t((_a = Parms.value) == null ? void 0 : _a.title),
        b: (_b = Parms.value) == null ? void 0 : _b.author.avatar,
        c: common_vendor.t((_c = Parms.value) == null ? void 0 : _c.author.author_name),
        d: common_vendor.t((_d = Parms.value) == null ? void 0 : _d.create_time),
        e: common_vendor.t((_e = Parms.value) == null ? void 0 : _e.browse_count),
        f: common_vendor.t((_f = Parms.value) == null ? void 0 : _f.thumbs_up_count),
        g: common_vendor.t(isFllow.value ? "取消关注" : "关注"),
        h: common_vendor.o(followAuthor),
        i: common_vendor.p({
          content: content.value,
          selectable: true,
          lazyLoad: "true"
        }),
        j: common_vendor.f(commentList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(repalyComment, item._id),
            b: "c105ddd4-1-" + i0,
            c: common_vendor.p({
              commentData: item
            }),
            d: item._id
          };
        }),
        k: commentList.value.length > 0
      }, commentList.value.length > 0 ? {} : {}, {
        l: common_vendor.p({
          type: "compose",
          size: "16",
          color: "#f07373"
        }),
        m: common_vendor.o(openShow),
        n: common_vendor.p({
          type: "chat",
          size: "22",
          color: "#f07373"
        }),
        o: common_vendor.o(goComment),
        p: common_vendor.p({
          itemId: (_g = Parms.value) == null ? void 0 : _g._id
        }),
        q: common_vendor.p({
          type: isGood.value ? "hand-up-filled" : "hand-up",
          size: "22",
          color: "#f07373"
        }),
        r: common_vendor.o(setGoodOk),
        s: common_vendor.o(closeShow),
        t: common_vendor.o(sendDataComent),
        v: common_vendor.p({
          isshow: isShow.value
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
