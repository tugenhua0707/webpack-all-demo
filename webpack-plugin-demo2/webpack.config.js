
const path = require('path');

// 引入 mini-css-extract-plugin 插件 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 清除dist目录下的文件
const ClearWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

// 引入打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入HappyPack插件 
const HappyPack = require('happypack');

// 引入 ParallelUglifyPlugin 插件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// 引入 webpack-deep-scope-plugin 优化
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

var publicPath =  '/';

// 引入LogWebpackPlugin 插件
const LogWebpackPlugin = require('./public/plugins/logWebpackPlugin');

module.exports = {
  // 入口文件
  entry: {
    main: './public/js/main.js'
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        // 使用正则去匹配
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-cssnext')(),
                require('cssnano')(),
                require('postcss-pxtorem')({
                  rootValue: 16,
                  unitPrecision: 5,
                  propWhiteList: []
                }),
                require('postcss-sprites')()
              ]
            }
          },
          {
            loader: 'stylus-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=css-pack'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: ['happypack/loader?id=image']
      },
      {
        test: /\.js$/,
        // 将对.js文件的处理转交给id为babel的HappyPack的实列
        use: ['happypack/loader?id=babel'],
        // loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8083,
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
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html' // 模版文件
    }),
    new ClearWebpackPlugin(['dist']),

    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash:8].css' : '[name].css'
    }),
    /****   使用HappyPack实例化    *****/
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'image',
      loaders: [{
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }]
    }),
    // 处理styl文件
    new HappyPack({
      id: 'css-pack',
      loaders: ['css-loader']
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
          */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false
        },
        compress: {
          /*
           是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
           不大的警告
          */
          warnings: false,

          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: true,

          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
          collapse_vars: true,

          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          reduce_vars: true
        }
      }
    }),
    new WebpackDeepScopeAnalysisPlugin(),
    new LogWebpackPlugin(() => {
      // Webpack 模块完成转换成功
      console.log('emit 事件发生啦，所有模块的转换和代码块对应的文件已经生成好~')
    } , () => {
      // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
      console.log('done 事件发生啦，成功构建完成~')
    })
  ]
};