import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from "../utils/myaxios";
export default new Vuex.Store({
  state: {
    // 在这个里面添加属性，但是不能在这里修改
    id: 2,
    name: "",
    sex: "",
    age: "",
  },
  mutations: {
    // 需要在这里进行修改state定义的属性
    updateName(state, name) {
      state.name = name;
    },
    // 直接在vuex里面放松请求，将数据存储在这里面，这样可以所有的组件都可以使用
    getServe(state, dataUser) {
      const { id, name, sex, age } = dataUser;
      state.name = name;
      state.age = age;
      console.log(id + sex);
    },
  },
  actions: {
    // mutations 方法内不能包括修改不能立刻生效的代码，否则会造成 Vuex 调试工具工作不准确，必须把这些代码写在 actions 方法中
    get(context) {
      axios.get("/student/search").then((res) => {
        context.commit("getServe", res.data.data);
        console.log(res.data.data);
      });
    },
  },
  modules: {},
});
