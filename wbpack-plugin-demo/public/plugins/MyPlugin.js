
class MyPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = {};
  }
  apply(compiler) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g;
    compiler.hooks.emit.tap('CodeBeautify', (compilation) => {
      Object.keys(compilation.assets).forEach((data) => {
        let content = compilation.assets[data].source(); // 获取处理的文本
        content = content.replace(reg, function (word) { // 去除注释后的文本
          return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
        });
        compilation.assets[data] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          }
        }
      });
    });
  }
}
module.exports = MyPlugin;