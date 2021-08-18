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
        import("../views/users/users.vue"),
      meta: {
        title: '用户列表'
      }
    },
    {
      path: "/roles",
      name: "roles",
      component: () =>
        import("../views/roles/roles.vue"),
      meta: {
        title: '角色列表'
      }
    },
    {
      path: "/rights",
      name: "rights",
      component: () =>
        import("../views/rights/rights.vue"),
      meta: {
        title: '权限列表'
      }
    },
    {
      path: "/goods",
      name: "goods",
      component: () =>
        import("../views/goods/goods.vue"),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: "/params",
      name: "params",
      component: () =>
        import("../views/params/params.vue"),
      meta: {
        title: '分类参数'
      }
    },
    {
      path: "/categories",
      name: "categories",
      component: () =>
        import("../views/categories/categories.vue"),
      meta: {
        title: '商品分类'
      }
    },
    {
      path: "/orders",
      name: "orders",
      component: () =>
        import("../views/orders/orders.vue"),
      meta: {
        title: '订单管理'
      }
    },
    {
      path: "/reports",
      name: "reports",
      component: () =>
        import("../views/reports/reports.vue"),
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
