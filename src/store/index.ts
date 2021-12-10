import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";
import { localCache } from "@/utils/storage";
import getters from "./getters";

// const modulesFiles = require.context('./modules', true, /\.ts$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

// 定义用户状态接口
export interface UserState {
  count: number;
  token: string;
  userInfo: any;
}

// vuex-persistedstate提供有一个reducer函数，可以自定义存储Key，或者使用paths参数，建议使用paths参数比较简单
// 非Module格式：xxxx
// 使用了Module的格式：ModuleName.xxxx，这里持久化的是Theme Module下面的persistData数据

const PERSIST_PATHS = ["token", "userInfo"];

const modulesFiles = require.context("./modules", true, /\.ts$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

console.log(modules, "=============p");
// 初始化Vuex
export default createStore({
  state: <UserState>{
    count: 0,
    token: "",
    userInfo: {},
  },
  mutations: {
    add(state) {
      state.count++;
    },
    // 设置token
    setToken(state: any, token) {
      state.token = token;
      localCache.setCache("token", token);
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localCache.setCache("userInfo", userInfo);
    },
  },

  actions: {},
  getters,
  modules,
  // 使用Vuex 数据持久化插件
  plugins: [
    createPersistedState({
      /*
    storage 默认存储到 localStorage
    存储到 sessionStorage 配置 storage: window.sessionStorage
     */
      // reducer: function 返回需要储存的state对象
      // reducer(val) {
      //   return {
      //     // 持久化存储 state 中的 token
      //     token: val.token,
      //     userInfo: val.userInfo
      //   }
      // },
      /*
      paths 设置保留持久化的数据，不设置则持久化全部数据
    */
      paths: PERSIST_PATHS,
      storage: {
        getItem: (key) => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});
