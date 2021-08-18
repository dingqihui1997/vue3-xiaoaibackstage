import { createStore } from "vuex";

export default createStore({
  state: {
    tabList: localStorage.getItem('tabList'),//储存导航菜单
  },
  mutations: {
    settabList(state, data) {
      state.tabList = data
    },
  },
  actions: {},
  modules: {},
});
