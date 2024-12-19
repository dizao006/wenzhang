"use strict";
const common_vendor = require("../common/vendor.js");
const store_mutations = require("./mutations.js");
const store_actions = require("./actions.js");
const store_state = require("./state.js");
const store = common_vendor.createStore({
  state: store_state.state,
  mutations: store_mutations.mutations,
  actions: store_actions.actions
});
exports.store = store;
