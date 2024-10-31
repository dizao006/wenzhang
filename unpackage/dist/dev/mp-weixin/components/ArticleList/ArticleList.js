"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_home = require("../../ajax/api/interface/home.js");
if (!Array) {
  const _easycom_ListItem2 = common_vendor.resolveComponent("ListItem");
  _easycom_ListItem2();
}
const _easycom_ListItem = () => "../ListItem/ListItem.js";
if (!Math) {
  _easycom_ListItem();
}
const _sfc_main = {
  __name: "ArticleList",
  props: ["artList", "activeIndex"],
  emits: ["changeIndex"],
  setup(__props, { emit: __emit }) {
    let prop = __props;
    let emit = __emit;
    let articleData = common_vendor.ref({});
    let loadData = common_vendor.ref({});
    let indx = common_vendor.ref();
    common_vendor.ref(1);
    let pageSize = common_vendor.ref(6);
    function changeAct(e) {
      const index = e.detail.current;
      emit("changeIndex", index);
    }
    common_vendor.watch([() => prop.artList, () => prop.activeIndex], (n) => {
      indx.value = n[0][n[1]];
      getArtList(indx.value);
    }, {
      immediate: true
    });
    async function getArtList(num) {
      if (!loadData.value[prop.activeIndex]) {
        loadData.value[prop.activeIndex] = {
          page: 1,
          loading: "loading,",
          total: 0
        };
      }
      let {
        articleList,
        total
      } = await ajax_api_interface_home.get_article_list({
        classify: num.name,
        page: loadData.value[prop.activeIndex].page,
        pageSize: pageSize.value
      });
      let oldList = articleData.value[prop.activeIndex] || [];
      if (JSON.stringify(articleList) !== JSON.stringify(oldList))
        oldList.push(...articleList);
      articleData.value[prop.activeIndex] = oldList;
      loadData.value[prop.activeIndex].total = total;
    }
    function loadMore() {
      if (loadData.value[prop.activeIndex].total === articleData.value[prop.activeIndex].length) {
        loadData.value[prop.activeIndex] = {
          ...loadData.value[prop.activeIndex],
          ...{
            loading: "noMore"
          }
        };
        common_vendor.nextTick$1();
        return;
      }
      loadData.value[prop.activeIndex].page++;
      getArtList(indx.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(prop).artList, (item, k0, i0) => {
          return {
            a: common_vendor.o(loadMore, item._id),
            b: "6335dad8-0-" + i0,
            c: item._id
          };
        }),
        b: common_vendor.p({
          loadData: common_vendor.unref(loadData)[common_vendor.unref(prop).activeIndex],
          articleList: common_vendor.unref(articleData)[common_vendor.unref(prop).activeIndex],
          isLoadMore: false
        }),
        c: common_vendor.unref(prop).activeIndex,
        d: common_vendor.o(changeAct)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6335dad8"]]);
wx.createComponent(Component);
