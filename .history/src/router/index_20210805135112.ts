import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import("../views/user.vue"),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: "/jurisdiction",
    name: "Jurisdiction",
    component: () =>
      import("../views/jurisdiction/Jurisdiction.vue"),
    meta: {
      title: '权限管理'
    }
  },
  {
    path: "/commodity",
    name: "Commodity",
    component: () =>
      import("../views/commodity/Commodity.vue"),
    meta: {
      title: '商品管理'
    }
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import("../views/order/Order.vue"),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () =>
      import("../views/statistics/Statistics.vue"),
    meta: {
      title: '数据统计'
    }
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
