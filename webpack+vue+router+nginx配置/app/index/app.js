
import Vue from 'vue';

import Index from './components/index';

// 引入路由
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(Index)
});