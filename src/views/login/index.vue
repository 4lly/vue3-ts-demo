<template>
  <a-form
    class="login-box"
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="username" label="账号" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item ref="password" label="密码" name="password">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
      <a-button type="primary" @click="onSubmit">登录</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// // 引入 封装的请求方法
// import { postAction } from "@/api/manage";
// // 引入 URL 统一管理文件
// import { Login } from "@/api/ajaxUrl.config";
interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    // Vuex
    const store = useStore();
    // Vue Router
    const router = useRouter();
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      username: "",
      password: "",
    });
    const rules = {
      username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 5, message: "最少3-5个字符", trigger: "blur" },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "change" }],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          let params = toRaw(formState);
          console.log("values", formState, toRaw(formState));
          if (params.username == "admin") {
            // 将token数据设置到Vuex
            store.commit("setToken", params.username);
            // 设置用户信息到Vuex
            store.commit("setUserInfo", params);
            // 登录成功
            router.push({ name: "layout" });
          }
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-box {
  width: 500px;
  margin: 200px auto;
  background: #f8f8f8;
  box-shadow: 0 0 5px 5px #fff;
  text-align: center;
  padding: 50px 0 30px;
  text-align: left;
}
</style>
