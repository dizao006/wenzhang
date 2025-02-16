"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    //轮播数据源
    swiperList: {
      type: Array,
      default: []
    },
    //背景图片
    bgUrl: {
      type: String,
      default: ""
    },
    //是否自动轮播
    autoplay: {
      type: Boolean,
      default: true
    },
    //轮播自动切换时间间隔
    interval: {
      type: Number,
      default: 5e3
    },
    //点击轮播是否有触感振动(自动轮播不生效)
    vibrate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timer: null,
      showListArr: []
    };
  },
  watch: {
    swiperList: {
      deep: true,
      immediate: true,
      handler(newArr) {
        let newList = JSON.parse(JSON.stringify(newArr));
        if (newList.length == 0)
          return;
        this.$nextTick(() => {
          newList.forEach((res, index) => {
            res.class = index;
          });
          this.showListArr = JSON.parse(JSON.stringify(newList));
          if (this.autoplay)
            this.autoPlayFun();
        });
      }
    }
  },
  methods: {
    autoPlayFun() {
      this.timer = setInterval(() => {
        this.getMenu();
      }, this.interval);
    },
    getMenu() {
      let list = this.showListArr.filter((res) => res.class == 1);
      this.click(1, list[0], false);
    },
    click(index, mess, clickState) {
      if (clickState)
        this.$emit("click", mess);
      if (this.autoplay && clickState)
        return;
      if (clickState && this.vibrate && !this.autoplay)
        common_vendor.index.vibrateShort();
      if (clickState) {
        this.getMenu();
        return;
      }
      for (let i = 0; i < this.showListArr.length; i++) {
        const item = this.showListArr[i];
        if (item.class > index) {
          item.class--;
        } else if (item.class === index) {
          item.class = 0;
        } else if (item.class === 0) {
          item.class = this.showListArr.length - 1;
        }
      }
      this.$emit("change", mess);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showListArr.length > 0
  }, $data.showListArr.length > 0 ? common_vendor.e({
    b: $props.bgUrl
  }, $props.bgUrl ? {
    c: $props.bgUrl
  } : {}, {
    d: common_vendor.f($data.showListArr, (item, index, i0) => {
      return {
        a: item.picUrl,
        b: common_vendor.t(item.title),
        c: common_vendor.n(item.class < 5 ? "card" + item.class : item.class % 2 == 0 ? "card3" : "card2"),
        d: index,
        e: common_vendor.o(($event) => $options.click(item.class, item, true), index)
      };
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9777623"]]);
wx.createComponent(Component);
