"use strict";
const common_vendor = require("./vendor.js");
function useIsLoggedIn() {
  const store = common_vendor.useStore();
  const checkLogin = () => {
    return new Promise((resolve, reject) => {
      const userInfo = store.state.userInfo;
      if (userInfo) {
        store.commit("updateUserInfo", userInfo);
        resolve(userInfo);
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/userinfo/login/login"
        }).catch((error) => {
          reject(error);
        });
      }
    });
  };
  return {
    checkLogin
  };
}
exports.useIsLoggedIn = useIsLoggedIn;
