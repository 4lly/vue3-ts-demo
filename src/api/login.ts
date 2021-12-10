import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// import { useRouter } from "vue-router";
import { postAction } from "@/api/manage";
import { cookies, localCache } from "@/utils/storage";
import { Modal, message } from "ant-design-vue";
/*
退出
*/
export function logout() {
  // const router = useRouter();
  Modal.confirm({
    title: "退出登录?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "确认",
    cancelText: "取消",
    onOk() {
      // postAction("/sys/logout", {}).then((res: any) => {
      //   if (res.success) {
      // 清空浏览器存储的所有数据
      cookies.removeCookie("vuex");
      localCache.clearCache();
      // 提示退出成功
      message.success("退出登录");
      // 跳转到登录页
      //  router.push({ name: "Login" });
      // 刷新整个浏览器
      setTimeout(() => {
        window.location.reload();
      }, 100);
      // }
      // });
    },
    onCancel() {
      message.info("取消退出登录");
    },
    class: "test",
  });
}
