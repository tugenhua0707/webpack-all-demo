
class FileListPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.compilation.tap('FileListPlugin', (compilation) => {
      compiler.hooks.emit.tap('FileListPlugin', () => {
        let content = '生成的文件列表\r\n';
        content = Object.keys(compilation.assets).reduce((current, prev) => current + '- ' + prev + '\r\n', content);
        console.log(content);
        compilation.assets['README.md'] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          }
        }
      })
    })
  }
}
module.exports = FileListPlugin;