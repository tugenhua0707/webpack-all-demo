
const ExternalModules = require('webpack/lib/ExternalModule');

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = {};
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      // parser 将代码转换为语法书 判断有无 import
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('AutoExternalPlugin', (parser, parserOptions) => {
        parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
          if (this.options[source]) {
            this.externalModules[source] = true;
          }
        })
      })
      // factory 是创建模块的方法
      // data 是创建模块的参数
      normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', factory => (data, callback) => {
        const dependencies = data.dependencies;
        const value = dependencies[0].request; // jquery
        if (this.externalModules[value]) {
          const varName = this.options[value].varName;
          callback(null, new ExternalModules(varName, 'window'));
        } else {
          factory(data, callback);
        }
      })
    });
    compiler.hooks.compilation.tap('InlinePlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('AutoExternalPlugin', (htmlPluginData, callback) => {
        Object.keys(this.options).forEach(key => {
          this.externalModules[key] = this.options[key];
          htmlPluginData.body.unshift(this.processTags(compilation, htmlPluginData, this.options[key]))
        });
        callback(null, htmlPluginData); 
      });
    });
  }
  processTags(compilation, htmlPluginData, value) {
    var tag;
    return tag = {
      tagName: 'script',
      closeTag: true,
      attributes: {
        type: 'text/javascript',
        src: value.url
      }
    }
  }
}

module.exports = AutoExternalPlugin;