import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // 比如在这里添加统一的 headers
    // console.log(config);
    config.headers = {
      Authorization: "aabbcc",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内走这里(成功之后走这里)
    // console.log(response);
    return response;
  },
  function (error) {
    // 超出 2xx, 比如 4xx, 5xx 走这里
    return Promise.reject(error);
  }
);

export default axios; // 需要暴露使用（然后使用的话，是导入使用）
