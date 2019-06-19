
import Vue from 'vue';
import VueRouter from 'vue-router';

// 告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['./components/home'], resolve)
  },
  {
    path: '/java',
    name: 'java',
    component: resolve => require(['./components/java'], resolve)
  },
  {
    path: '/node',
    name: 'node',
    component: resolve => require(['./components/node'], resolve)
  },
  {
    path: '/xxx',
    name: 'xxx',
    component: resolve => require(['./components/xxx'], resolve)
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/home'
  }
]

var router = new VueRouter({
  base: '', // 配置单页应用的基路径
  routes: routes,
  mode: 'history'
});

export default router;