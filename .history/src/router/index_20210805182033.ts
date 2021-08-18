import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Lazyout from '../views/layout/Layout.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/login/Login.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Lazyout,//父路由
    children: [{
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: "/users",
      name: "users",
      component: () =>
        import("../views/user/User.vue"),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: "/rights",
      name: "rights",
      component: () =>
        import("../views/jurisdiction/Jurisdiction.vue"),
      meta: {
        title: '权限管理'
      }
    },
    {
      path: "/goods",
      name: "goods",
      component: () =>
        import("../views/commodity/Commodity.vue"),
      meta: {
        title: '商品管理'
      }
    },
    {
      path: "/orders",
      name: "orders",
      component: () =>
        import("../views/order/Order.vue"),
      meta: {
        title: '订单管理'
      }
    },
    {
      path: "/reports",
      name: "reports",
      component: () =>
        import("../views/statistics/Statistics.vue"),
      meta: {
        title: '数据统计'
      }
    },]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})
export default router;
