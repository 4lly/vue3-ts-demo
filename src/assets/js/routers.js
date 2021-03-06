let routes = [
  {
    id: 1000,
    parentId: -1,
    icon: "iconquanxian",
    name: "组织架构",
    path: "/system",
    component: "Layout",
    redirect: null,
    type: "0",
    children: [
      {
        id: 1100,
        parentId: 1000,
        children: [],
        icon: "iconyonghuguanli",
        name: "用户管理",
        path: "/user",
        component: "views/system/user/index",
        redirect: null,
        type: "0",
      },
    ],
  },
  {
    id: 2000,
    parentId: -1,
    icon: "iconquanxian",
    name: "权限管理",
    path: "/organization",
    component: "Layout",
    redirect: null,
    type: "0",
    children: [
      {
        id: 2100,
        parentId: 2000,
        children: [],
        icon: "iconyonghuguanli",
        name: "菜单管理",
        path: "/menu",
        component: "views/system/user/index",
        redirect: null,
        type: "0",
      },
    ],
  },
];

export default routes;
