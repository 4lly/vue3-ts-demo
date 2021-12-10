/**
 * 规则：
 * 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
 * 三、填写后不会自动生成
 * **/
// 路由配置
export const routes = [
  {
    path: "/about",
    name: "about",
    component: "layout/index", //主布局
    // redirect: {name:'About'},
    children: [
      {
        name: "about_index",
        meta: { title: "关于我们" },
        component: "about/index",
      },
    ],
  },
  {
    path: "/news",
    name: "news",
    component: "layout/index", //主布局
    children: [
      {
        name: "news_index",
        meta: { title: "新闻咨询" },
        component: "news/index",
      },
      {
        name: "news_add",
        meta: { title: "添加新闻咨询" },
        component: "news/add",
      },
    ],
  },
  {
    path: "/products",
    name: "products",
    component: "layout/index", //主布局
    // redirect: {name:'About'},
    children: [
      {
        name: "products_index",
        meta: { title: "产品列表" },
        component: "products/index",
      },
    ],
  },
];
// 获取路由信息
export const getRoutes = (): any => {
  createRoutes(routes);
  return routes;
};

// 自动生成routes
export const createRoutes = (arr: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return;
    // 去除index结尾
    const val = getValue(arr[i].component);
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, "_");
    // 生成path
    arr[i].path = arr[i].path || `/${val}`;
    // 生成component
    const componentfun = import(`@/views/${arr[i].component}.vue`);
    arr[i].component = () => componentfun;
    if (arr[i].children && arr[i].children.length > 0) {
      createRoutes(arr[i].children);
    }
  }
};

export const getValue = (str: any) => {
  const index = str.lastIndexOf("/");
  const val = str.substring(index + 1, str.length);
  // 最后一个是index，去除
  if (val === "index") {
    return str.substring(index, -1);
  }
  return str;
};

export default getRoutes();
