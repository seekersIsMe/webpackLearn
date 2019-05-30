const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin'); // 分离css
const htmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const  cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports ={
  entry: './index.js',
  output: {
    filename: 'main[hash].js',//打包后的js名字
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../' //设置图片打包的相对路径
        })
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'less-loader'],
          publicPath: '../' //设置图片打包的相对路径
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'sass-loader'],
          publicPath: '../' //设置图片打包的相对路径 
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
              loader: 'url-loader',
              options: {
                  limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                  outputPath: './img/'   // 图片打包后存放的目录
              }
          }
      ]
      }
    ]
  },
  plugins: [
     // new HtmlWebpackPlugin()
        // new UglifyPlugin(), //压缩js
        // new HtmlWebpackPlugin({ // 处理html
        //     filename: '../dist/index.html',// 配置输出文件名和路径 
        //     template: '../index.html', // 配置文件模板
        //     inject: true,
        //     minify: {
        //       removeComments: true, // 剥离html评论
        //       collapseWhitespace: true, // 折叠文本节点的空白区域
        //       removeAttributeQuotes: true, // 尽可能删除属性周围的引号
        //       minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        //       minifyJS: true // 压缩 HTML 中出现的 JS 代码
        //       // more options:
        //       // https://github.com/kangax/html-minifier#options-quick-reference
        //     },
        //     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //     // chunksSortMode: 'dependency'
        //  }),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'login.html', //输出的html名字
      hash: true,// 会在js和css后面加上hash串
    }),
    new extractTextPlugin({
      filename: `css/index[hash].css`   //编译打包合并后css的存放目录以及名字
    }),
    new cleanWebpackPlugin()// 每次打包都清理dist目录
  ]
}