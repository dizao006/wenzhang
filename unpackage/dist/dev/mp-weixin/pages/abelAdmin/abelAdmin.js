"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_updateLableItem = require("../../ajax/api/interface/updateLableItem.js");
const ajax_api_interface_home = require("../../ajax/api/interface/home.js");
const ajax_api_interface_setlabelListItem = require("../../ajax/api/interface/setlabelListItem.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "abelAdmin",
  setup(__props) {
    const isEdit = common_vendor.ref(false);
    const store = common_vendor.useStore();
    const {
      labelList,
      userInfo
    } = store.state;
    const allLable = common_vendor.ref();
    common_vendor.onMounted(async () => {
      allLable.value = await ajax_api_interface_home.getLableList();
    });
    const cloneLableList = common_vendor.ref();
    const noList = common_vendor.computed(() => {
      return labelList.filter((item) => !cloneLableList.value.includes(item._id) && item._id);
    });
    const showList = common_vendor.computed(() => {
      return labelList.filter((item) => cloneLableList.value.includes(item._id));
    });
    common_vendor.watch(() => userInfo, (n, o) => {
      cloneLableList.value = n.labelIds;
    }, {
      immediate: true,
      deep: true
    });
    function changeEdit() {
      if (isEdit.value) {
        updateLable();
      }
      isEdit.value = !isEdit.value;
    }
    async function updateLable() {
      let {
        message
      } = await ajax_api_interface_updateLableItem.updateLableItem({
        labelList: cloneLableList.value,
        userId: userInfo._id
      });
      common_vendor.index.showToast({
        title: message
      });
      const showTable = allLable.value.filter((e) => {
        return cloneLableList.value.includes(e._id);
      });
      store.commit("setlabelListItem", showTable);
      await ajax_api_interface_setlabelListItem.setlabelListItem({
        showTable,
        userId: userInfo._id
      });
      store.commit("updateUserInfo", {
        ...userInfo,
        labelIds: cloneLableList.value,
        labelListItem: showTable
      });
    }
    function changeSelfItem(item) {
      if (!isEdit.value)
        return;
      cloneLableList.value.push(item._id);
    }
    function removeListItem(item) {
      if (!isEdit.value)
        return;
      cloneLableList.value = cloneLableList.value.filter((e) => e !== item._id);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(isEdit.value ? "完成" : "编辑"),
        b: common_vendor.o(changeEdit),
        c: showList.value.length
      }, showList.value.length ? {
        d: common_vendor.f(showList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name)
          }, isEdit.value ? {
            b: common_vendor.o(($event) => removeListItem(item), item._id),
            c: "2a05fddf-0-" + i0,
            d: common_vendor.p({
              type: "clear",
              size: "20",
              color: "red"
            })
          } : {}, {
            e: item._id
          });
        }),
        e: isEdit.value
      } : {}, {
        f: !showList.value.length
      }, !showList.value.length ? {} : {}, {
        g: common_vendor.f(noList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => changeSelfItem(item), item._id),
            c: item._id
          };
        }),
        h: !noList.value.length > 0
      }, !noList.value.length > 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a05fddf"]]);
wx.createPage(MiniProgramPage);
