import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

//  嵌套路由
// 2.如找不到路由，可以使用 path:'*',进行匹配，可以重定向
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // 动态路由加载，就是按需加载
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export function resetRouter() {
  router.matcher = new VueRouter({ routes }).matcher;
}

export default router;
