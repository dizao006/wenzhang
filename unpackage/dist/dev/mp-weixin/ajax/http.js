"use strict";
const common_vendor = require("../common/vendor.js");
const ajax = ({
  name,
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    common_vendor.Ys.callFunction({
      name,
      data,
      success({
        result
      }) {
        common_vendor.index.hideLoading();
        if (result.code === 0) {
          resolve(result.data);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: result.msg || "未知错误"
          });
          reject(new Error(result.msg || "未知错误"));
        }
      },
      fail(err) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          icon: "none",
          title: err.message || "请求失败"
        });
        reject(err);
      }
    });
  });
};
exports.ajax = ajax;
