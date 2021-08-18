import { createStore } from "vuex";

export default createStore({
  state: {
    menu: localStorage.getItem('menu'),//储存导航菜单
  },
  mutations: {
    setmenu(state, data) {
      state.menu = data
    },
  },
  actions: {},
  modules: {},
});
