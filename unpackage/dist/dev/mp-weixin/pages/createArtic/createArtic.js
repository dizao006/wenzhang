"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_addDrafts = require("../../ajax/api/interface/addDrafts.js");
const common_uuid = require("../../common/uuid.js");
const common_time = require("../../common/time.js");
const ajax_api_interface_fabu = require("../../ajax/api/interface/fabu.js");
const ajax_api_interface_getArticleById = require("../../ajax/api/interface/getArticleById.js");
const MAX_LENGTH = 99999;
const _sfc_main = {
  __name: "createArtic",
  setup(__props) {
    const store = common_vendor.useStore();
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const previewContent = common_vendor.ref("");
    const isPreview = common_vendor.ref(false);
    const articleId = common_vendor.ref(common_uuid.generateArticleId());
    const tagList = common_vendor.ref([
      "前端开发",
      "后端开发",
      "移动开发",
      "职场生活",
      "精彩直播",
      "每日一题"
    ]);
    const selectedTagIndex = common_vendor.ref(0);
    const goBack = async () => {
      common_vendor.index.showToast({
        title: "自动保存成功",
        icon: "success"
      });
      await save();
      content.value = "";
      title.value = "";
      selectedTagIndex.value = 0;
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const togglePreview = () => {
      isPreview.value = !isPreview.value;
      if (isPreview.value) {
        previewContent.value = common_vendor.marked(content.value);
      }
    };
    const onTagChange = (e) => {
      selectedTagIndex.value = e.detail.value;
    };
    const save = async () => {
      const data = {
        abstractText: content.value.slice(0, 20),
        author: {
          author_name: store.state.userInfo.author_name,
          avatar: store.state.userInfo.avatar,
          id: store.state.userInfo.id,
          _id: store.state.userInfo._id
        },
        browse_count: 0,
        classify: tagList.value[selectedTagIndex.value],
        collection_count: 0,
        comments_count: 0,
        content: common_vendor.marked(content.value),
        cover: [],
        create_time: common_time.times(),
        articleId: articleId.value,
        // 使用初始化生成的 articleId
        userId: store.state.userInfo._id,
        title: title.value,
        thumbs_up_count: 0,
        status: "draft",
        comments: [],
        "mode": "base",
        tags: [tagList.value[selectedTagIndex.value]]
      };
      store.commit("addArticList", data);
      await ajax_api_interface_addDrafts.addDrafts({
        Drafts: data,
        id: store.state.userInfo._id,
        articleId: articleId.value
      });
      common_vendor.index.showToast({
        title: "保存为草稿成功",
        icon: "success"
      });
      console.log(store.state);
    };
    const publish = async () => {
      if (!title.value || !content.value) {
        common_vendor.index.showToast({
          title: "标题或内容不能为空",
          icon: "error"
        });
        return;
      }
      const data = {
        abstractText: content.value.slice(0, 20),
        author: {
          author_name: store.state.userInfo.author_name,
          avatar: store.state.userInfo.avatar,
          id: store.state.userInfo.id,
          _id: store.state.userInfo._id
        },
        browse_count: 0,
        classify: tagList.value[selectedTagIndex.value],
        collection_count: 0,
        comments_count: 0,
        content: common_vendor.marked(content.value),
        cover: [],
        create_time: common_time.times(),
        articleId: articleId.value,
        // 使用初始化生成的 articleId
        userId: store.state.userInfo._id,
        title: title.value,
        thumbs_up_count: 0,
        status: "published",
        comments: [],
        "mode": "base",
        tags: [tagList.value[selectedTagIndex.value]]
      };
      store.commit("addArticle", data);
      await ajax_api_interface_fabu.fabu({
        Drafts: data,
        userId: store.state.userInfo._id,
        articleId: articleId.value
        // 使用初始化生成的 articleId
      });
      common_vendor.index.showToast({
        title: "发布成功",
        icon: "success"
      });
      content.value = "";
      title.value = "";
      selectedTagIndex.value = 0;
    };
    common_vendor.onMounted(async () => {
      const query = common_vendor.index.getStorageSync("query");
      if (query && query.articleId) {
        articleId.value = query.articleId;
        try {
          const res = await ajax_api_interface_getArticleById.getArticleById({
            articleId: query.articleId
          });
          if (res.code === 0) {
            const articleData = res.data;
            title.value = articleData.title;
            content.value = articleData.content;
            const tagIndex = tagList.value.indexOf(articleData.classify);
            if (tagIndex > -1) {
              selectedTagIndex.value = tagIndex;
            }
          }
        } catch (error) {
          console.error("获取文章数据失败:", error);
        }
      }
    });
    common_vendor.onHide(() => {
      articleId.value = common_uuid.generateArticleId();
      content.value = "";
      title.value = "";
      selectedTagIndex.value = 0;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.t(isPreview.value ? "编辑" : "预览"),
        c: common_vendor.o(togglePreview),
        d: common_vendor.o(save),
        e: common_vendor.t(tagList.value[selectedTagIndex.value]),
        f: tagList.value,
        g: selectedTagIndex.value,
        h: common_vendor.o(onTagChange),
        i: common_vendor.o(publish),
        j: title.value,
        k: common_vendor.o(($event) => title.value = $event.detail.value),
        l: !isPreview.value
      }, !isPreview.value ? {
        m: MAX_LENGTH,
        n: content.value,
        o: common_vendor.o(($event) => content.value = $event.detail.value),
        p: common_vendor.t(content.value.length),
        q: common_vendor.t(MAX_LENGTH)
      } : {}, {
        r: isPreview.value
      }, isPreview.value ? {
        s: previewContent.value
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9deb6ff"]]);
wx.createPage(MiniProgramPage);
