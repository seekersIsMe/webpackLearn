const path = require('path');
const UglifyPlugin =require('uglifyjs-webpack-plugin') //压缩js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'../src/index.js',
    rules: [
        {
            test: '/\.jsx?/',
            include: [
                path.resolve(__dirname, 'src')
            ],
            use: 'babel-loader'
        }
    ],
    plugins: [
        new UglifyPlugin(),
        new HtmlWebpackPlugin({
            filename: '/dist/[hash]/index.hmtl', // 配置输出文件名和路径
            template: '../src/index.html' // 配置文件模板
        })
    ],
    output: {
        path: path.resolve(__dirname, '/dist/[hash]'),
        filename: '[name].js'
    }
}