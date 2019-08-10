const path  = require('path');
const DonePlugin = require('./public/plugins/DonePlugin');
const OptimizePlugin = require('./public/plugins/OptimizePlugin');
const AsyncPlugin = require('./public/plugins/AsyncPlugin');
const FileListPlugin = require('./public/plugins/FileListPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoExternalPlugin = require('./public/plugins/AutoExternalPlugin');
const MyPlugin = require('./public/plugins/MyPlugin');

module.exports = {
  entry:'./public/js/main.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename:'bundle.js'
  },
  devServer: {
    port: 8084,
    host: 'xxx.abc.com',
    headers: {
      'X-foo': '112233'
    },
    inline: true,
    overlay: true,
    stats: 'errors-only',
    contentBase: path.join(__dirname, "/"),
    disableHostCheck: true
  },
  plugins:[
    new DonePlugin(),
    new OptimizePlugin(),
    new AsyncPlugin(),
    new FileListPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html' // 模版文件
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    }),
    new MyPlugin(),
    new AutoExternalPlugin({
      jquery:{
        varName:'jQuery',
        url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
      }
    })
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      }
    ]
  }
}