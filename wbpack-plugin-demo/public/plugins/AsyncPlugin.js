
class AsyncPlugin {
  constructor() {

  }
  apply(compiler) {
    // 监听emit事件，编译完成后，文件内容输出到硬盘上 触发该事件
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('文件将要被写入到硬盘中');
        callback();
      }, 2000)
    })
  }
}

module.exports = AsyncPlugin;