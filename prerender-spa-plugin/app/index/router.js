
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件 
import home from './views/home';
import path from 'path';

// 告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['./views/home'], resolve),
    // 子路由
    children: [
      {
        path: 'java',
        name: 'java',
        component: resolve => require(['./views/java'], resolve)
      },
      {
        path: 'node',
        name: 'node',
        component: resolve => require(['./views/node'], resolve)
      }
    ]
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/home'
  }
]

var router = new VueRouter({
  mode: 'history', // 访问路径不带井号  需要使用 history模式
  // base: path.resolve(__dirname, '/app/index'), // 配置单页应用的基路径
  routes: routes
});

export default router;