import Cookies from "js-cookie";
/*
 * localStorage 封装
 */
const localCache = {
  // 设置
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  // 获取
  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  },
  // 清空某一个
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  },
  // 清空全部
  clearCache() {
    window.localStorage.clear();
  },
};

/**
 * sessionStorage 分装
 */
const sessionStorage = {
  //存储
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get<T>(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  },
  // 删除数据
  remove(key: string) {
    window.sessionStorage.removeItem(key);
  },
};

const cookies = {
  getCookie(key: string) {
    return Cookies.get(key);
  },
  setCookie(key: string, value: any) {
    Cookies.set(key, value);
  },
  removeCookie(key: string) {
    Cookies.remove(key);
    return;
  },
};

export { sessionStorage, localCache, cookies };
