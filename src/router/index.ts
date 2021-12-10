import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// 引入获取token 方法
import { localCache } from "@/utils/storage";

// 路由懒加载
const Login = () => import("@/views/login/index.vue");
import permission from "@/store/modules/permission";
import store from "@/store";
export const constantRoutes = [
  {
    path: "/",
    name: "Login",
    hidden: true,
    component: Login,
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/home",
    hidden: true,
    // 定义嵌套路由 实现 Layout 布局
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        hidden: true,
      },
    ],
  },
];
export const asyncRoutes: any = [
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/components/NoFind.vue"),
  },
];
// 初始化路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

// 设置路由守卫
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径，form表示从那个页面跳转而来，next表示允许跳转到指定位置
  if (to.path == "/") {
    // 当前访问为登陆页，直接进入
    next();
  } else {
    // 获取用户本地的token, 如果token不存在则跳转到登录页
    const token = localCache.getCache("token");
    if (!token) {
      next("/");
    } else {
      if (!permission.state.routes.length) {
        store.dispatch("generateRoutes").then((routesArr: any) => {
          routesArr.forEach((item: RouteRecordRaw) => {
            // 添加一条新的路由记录作为现有路由的子路由。如果路由有一个 name，并且已经有一个与之名字相同的路由，它会先删除之前的路由。 ps:保证name不重名
            router.addRoute(item);
          });
          next({ path: to.fullPath, replace: true, query: to.query });
        });
      } else {
        next();
      }
      // // 如果登录了，则直接跳转
      // next();
    }
  }
});

export default router;
