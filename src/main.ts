import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/scss/iconfont.scss";
import "./assets/scss/base.scss";
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.mount("#app");
