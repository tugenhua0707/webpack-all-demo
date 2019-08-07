// 加载css样式
require('../styles/main.styl');

const { SyncHook } = require('tapable');

const h1 = new SyncHook(['xxx']);

h1.tap('A', function(args) {
  console.log('A', args);
  return 'b';
});

h1.tap('B', function() {
  console.log('b');
});

h1.tap('C', function() {
  console.log('c');
});
h1.tap({
  name: 'F',
  before: 'D'
}, function() {
  
});
h1.tap({
  name: 'E',
  before: 'C'
}, function() {

});
h1.tap('D', function() {
  console.log('d');
});
h1.call(7777);
/*
h1.intercept({
  call: (...args) => {
    console.log(...args, '11111111');
  },
  register: (tap) => {
    console.log(tap, '222222');
    return tap;
  },
  loop: (...args) => {
    console.log(...args, '33333');
  },
  tap: (tap) => {
    console.log(tap, '444444');
  }
});
*/















