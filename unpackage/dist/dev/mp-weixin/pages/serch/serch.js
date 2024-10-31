"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_get_search_data = require("../../ajax/api/interface/get_search_data.js");
if (!Math) {
  (NavBar + ListItem)();
}
const NavBar = () => "../../components/NavBar/NavBar.js";
const ListItem = () => "../../components/ListItem/ListItem.js";
const _sfc_main = {
  __name: "serch",
  setup(__props) {
    const isSearch = common_vendor.ref(true);
    const serchValue = common_vendor.ref("");
    const serchList = common_vendor.ref([]);
    const isload = common_vendor.ref(false);
    const isShowHistory = common_vendor.ref(true);
    const store = common_vendor.useStore();
    function saveSearchHistory() {
      console.log(serchValue.value, "asdasd");
      store.commit("setHistoryList", serchValue.value);
    }
    function updateValue(data) {
      serchValue.value = data;
    }
    async function sendSearchData() {
      isShowHistory.value = false;
      if (!serchValue.value) {
        isShowHistory.value = true;
        serchList.value = [];
        return;
      }
      const {
        articleList
      } = await ajax_api_interface_get_search_data.get_search_data({
        searchVal: serchValue.value
      });
      serchList.value = articleList;
    }
    function openHistory(value) {
      updateValue(value);
      sendSearchData();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(sendSearchData),
        b: common_vendor.o(updateValue),
        c: common_vendor.p({
          isSearch: isSearch.value,
          serchValue: serchValue.value
        }),
        d: isShowHistory.value
      }, isShowHistory.value ? common_vendor.e({
        e: common_vendor.o(($event) => common_vendor.unref(store).commit("clearData")),
        f: common_vendor.unref(store).state.historyList.length > 0
      }, common_vendor.unref(store).state.historyList.length > 0 ? {
        g: common_vendor.f(common_vendor.unref(store).state.historyList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => openHistory(item), item),
            c: item
          };
        })
      } : {}) : common_vendor.e({
        h: serchList.value.length >= 0
      }, serchList.value.length >= 0 ? {
        i: common_vendor.p({
          articleList: serchList.value,
          saveSearchHistory,
          isLoadMore: isload.value
        })
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07038b13"]]);
wx.createPage(MiniProgramPage);
