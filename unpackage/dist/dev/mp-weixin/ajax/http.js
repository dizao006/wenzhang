"use strict";
const common_vendor = require("../common/vendor.js");
const ajax = ({
  name,
  data = {}
  // 返回一个promise对象
}) => {
  return new Promise((reslove, reject) => {
    common_vendor.index.showLoading({});
    common_vendor.Ws.callFunction({
      name,
      //调用哪个方法
      data,
      success({
        result
      }) {
        if (result.code == 0) {
          reslove(result.data);
        } else {
          common_vendor.index.showToast({
            //没有拿到数据就提示失败
            icon: "none",
            title: result.msg
          });
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        common_vendor.index.hideLoading();
      }
    });
  });
};
exports.ajax = ajax;
