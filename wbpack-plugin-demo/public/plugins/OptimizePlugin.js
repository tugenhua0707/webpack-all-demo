
class OptimizePlugin {
  constructor() {

  }
  apply(compiler) {
    // 监听 compilation 事件
    compiler.hooks.compilation.tap('OptimizePlugin', (compilation) => {
      compilation.hooks.optimize.tap('OptimizePlugin', () => {
        console.log('compilation 完成，正在优化，准备输出');
      });
    });
  }
}

module.exports = OptimizePlugin;