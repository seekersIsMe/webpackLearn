const path = require('path');
const UglifyPlugin =require('uglifyjs-webpack-plugin') //压缩js
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log( path.resolve(__dirname, 'src'))
module.exports = {
    entry:'../src/index.js',
    rules: [
        {
            test: '/\.jsx?/',
            include: [
                path.resolve(__dirname, 'src')
            ],
            use: 'babel-loader'
        },
        {
            test: '/\.css',
            include: [
                path.resolve(__dirname, 'src/css')
            ],
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          },
          {
            test: /\.jsx?/, // 支持 js 和 jsx
            include: [
              path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
            ],
            loader: 'babel-loader',
          },

    ],
    plugins: [
        new UglifyPlugin(), //压缩js
        new HtmlWebpackPlugin({ // 处理html
            filename: 'dist/index.html',// 配置输出文件名和路径 
            template: 'index.html', // 配置文件模板
            inject: true,
            minify: {
              removeComments: true, // 剥离html评论
              collapseWhitespace: true, // 折叠文本节点的空白区域
              removeAttributeQuotes: true, // 尽可能删除属性周围的引号
              minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
              minifyJS: true // 压缩 HTML 中出现的 JS 代码
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
          }),
    ],
    output: {
        path: path.resolve(__dirname, '/dist/[hash]'),
        filename: '[name].js'
    }
}