import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { notification } from "ant-design-vue"; // 结合 ant-design-vue 做全局提示
import store from "@/store"; // 获取 token
import { localCache } from "@/utils/storage"; // 引入读取token
import { logout } from "@/api/login"; // 引入退出登录方法
// 初始化
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 120 * 1000,
  withCredentials: true,
});

// 请求错误
const err = (error: {
  message: string | string[];
  response: { data: any; status: number };
}) => {
  if (error.message.includes("timeout")) {
    notification.error({
      message: "系统提示",
      description: "请求超时",
      duration: 4,
    });
  }
  if (error.response) {
    const data = error.response.data;
    const token = localCache.getCache("token");
    if (error.response.status == 403) {
      notification.error({
        message: "系统提示",
        description: "请求资源失败",
        duration: 4,
      });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notification.error({
        message: "系统提示",
        description: "没有访问权限",
        duration: 4,
      });
      // token 存在但是没有访问权限，退出登录
      if (token) {
        logout();
      }
    }
  }
  return Promise.reject(error);
};

// 请求
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 获取系统token
  const token: string = store.state.token;
  if (token) {
    config.headers["X-Access-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  // 配置 get 接口默认参数携带时间戳请求
  if (config.method == "get") {
    config.params = {
      _t: new Date().getTime(),
      ...config.params,
    };
  }
  return config;
}, err);

// 拦截成功请求
instance.interceptors.response.use((response: AxiosResponse) => {
  const config: AxiosRequestConfig = response.config || "";
  const code = Number(response.data.code);
  // code 状态根据前后端协定接口成功状态修改
  if (code == 200 || code == 0) {
    if (config) {
      console.log("请求成功");
    }
    return response.data;
  } else {
    const errorCode = [402, 403, 500];
    if (errorCode.includes(response.data.code)) {
      notification.error({
        message: "系统提示",
        description: "没有权限",
        duration: 4,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
}, err);

export default instance;
