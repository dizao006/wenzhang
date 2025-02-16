"use strict";
const common_vendor = require("../../common/vendor.js");
const ajax_api_interface_getSelected = require("../../ajax/api/interface/getSelected.js");
const ajax_api_interface_addSelected = require("../../ajax/api/interface/addSelected.js");
if (!Array) {
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_uni_section + _easycom_uni_calendar2 + _easycom_uni_icons2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "Calendar",
  setup(__props) {
    const state = common_vendor.useStore();
    let userId = state.state.userInfo._id;
    function getDate(date2, AddDayCount = 0) {
      if (!date2) {
        date2 = /* @__PURE__ */ new Date();
      }
      if (typeof date2 !== "object") {
        date2 = date2.replace(/-/g, "/");
      }
      const dd = new Date(date2);
      dd.setDate(dd.getDate() + AddDayCount);
      const y = dd.getFullYear();
      const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return {
        fullDate: y + "-" + m + "-" + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
      };
    }
    const showCalendar = common_vendor.ref(false);
    common_vendor.ref({
      lunar: true,
      range: true,
      insert: false
    });
    let selected = common_vendor.reactive([]);
    const date = getDate();
    common_vendor.onMounted(async () => {
      const initialSelectedDate = getDate(/* @__PURE__ */ new Date());
      const datas = await ajax_api_interface_getSelected.getSelected({
        userId
      });
      selected.push(...datas.data);
      const data = {
        date: initialSelectedDate.fullDate,
        info: "打卡"
      };
      if (JSON.stringify(selected[selected.length - 1]) !== JSON.stringify(data)) {
        selected.push(data);
        state.commit("addSelected", data);
        await ajax_api_interface_addSelected.addSelected({
          userId,
          data
        });
        setTimeout(() => {
          common_vendor.index.showToast({
            title: "签到成功",
            icon: "success"
          });
        }, 500);
      }
      showCalendar.value = true;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showCalendar.value
      }, showCalendar.value ? {
        b: common_vendor.p({
          title: "插入模式",
          type: "line"
        }),
        c: common_vendor.o(_ctx.changehandle),
        d: common_vendor.p({
          showMonth: true,
          lunar: true,
          selected: common_vendor.unref(selected)
        })
      } : {}, {
        e: common_vendor.p({
          size: "45px",
          color: "blue",
          type: "flag"
        }),
        f: common_vendor.t(common_vendor.unref(date).fullDate),
        g: common_vendor.p({
          size: "15px",
          color: "blue",
          type: "fire"
        }),
        h: common_vendor.p({
          size: "45px",
          color: "blue",
          type: "calendar"
        }),
        i: common_vendor.p({
          size: "15px",
          color: "blue",
          type: "fire"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
