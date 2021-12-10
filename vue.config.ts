module.exports = {
  configureWebpack: (config) => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    } else {
      // 开发环境
    }
  },
  // 配置 scss
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/index.scss";`,
      },
    },
  },
  // 配置服务端代理
  devServer: {
    port: 3000,
    proxy: {
      "/pr-api": {
        target: "http://localhost:3085",
        ws: false,
        changeOrigin: true,
      },
    },
  },

  lintOnSave: undefined,
};