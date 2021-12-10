import { Commit } from "vuex";
import { demoState } from "@/config/interface";
const state: demoState = {
  userName: "零零三",
};
const mutations: any = {
  setName(state: any, name: string) {
    state.userName = name;
  },
};
const actions: any = {
  setName(context: { commit: Commit }, name: string) {
    context.commit("setName", name);
  },
};
export default {
  namespaced: false, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
};
