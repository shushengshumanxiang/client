module.exports = {
  devServer: {
    port: 7070,

    //   下面配置跨域问题（利用代理来进行跨域问题）
    proxy: {
      "/": {
        target: "http://localhost:8080",
        pathRewrite: { "^/": "" },
        changeOrigin: true,
      },
    },

    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'http://localhost:3000',
    //         pathRewrite: { '^/api': '' },
    //       },
    //     },
    //   },
  },
};
