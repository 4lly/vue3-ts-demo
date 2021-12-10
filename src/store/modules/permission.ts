import { Commit } from "vuex";
import { demoState } from "@/config/interface";
import { constantRoutes, asyncRoutes } from "@/router/index";
import fechRoutes, { routes } from "@/config/fechRoutes";
const Layout = () => import("@/views/layout/index.vue");
interface permissionState {
  routes: any[];
  addRoutes: any[];
}
const state: permissionState = {
  routes: [],
  addRoutes: [],
};
const mutations: any = {
  setRoutes(state: any, routes: any) {
    state.addRoutes = routes;
    state.routes = routes;
  },
};
const actions: any = {
  setName(context: { commit: Commit }, name: string) {
    context.commit("setName", name);
  },
  generateRoutes(context: { commit: Commit }, name: string): any {
    return new Promise((resolve) => {
      // 向后端请求路由数据

      // getRouters().then(res => {
      //   const accessedRoutes = filterAsyncRouter(res.data)
      //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      //   commit('SET_ROUTES', accessedRoutes)
      //   resolve(accessedRoutes)
      // })
      const accessedRoutes = constantRoutes
        .concat(fechRoutes)
        .concat(asyncRoutes);
      context.commit("setRoutes", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};
export default {
  namespaced: false, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
};
