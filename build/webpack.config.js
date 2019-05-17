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
            template: 'index.html',
            inject: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
          }),
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname, '../dist/[hash]/index.html'), // 配置输出文件名和路径
            template: '../src/index.html' // 配置文件模板
        })
    ],
    output: {
        path: path.resolve(__dirname, '/dist/[hash]'),
        filename: '[name].js'
    }
}