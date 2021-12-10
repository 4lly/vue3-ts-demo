<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <SliderComponent></SliderComponent>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header" style="background: #fff; padding: 0 15px">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <RedoOutlined class="m-l-20" @click="handleReload" />
        </div>

        <ImportOutlined class="logout" @click="logoutHandel" />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <div v-if="isRouterAlive">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RedoOutlined,
  ImportOutlined,
} from "@ant-design/icons-vue";
import SliderComponent from "./slider.vue";
import { defineComponent, ref, nextTick } from "vue";
import { logout } from "@/api/login";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RedoOutlined,
    SliderComponent,
    ImportOutlined,
  },
  setup() {
    const isRouterAlive = ref<boolean>(true);
    const handleReload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    const logoutHandel = () => {
      logout();
    };
    return {
      collapsed: ref<boolean>(false),
      handleReload,
      isRouterAlive,
      logoutHandel,
    };
  },
});
</script>
<style>
.ant-layout-sider {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  flex: 1;
}
</style>
