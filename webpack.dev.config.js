const baseWebpackConfig = require('./webpack.confIG')
const merge = require('webpack-merge')
const devWebpackConfig = merge(baseWebpackConfig,{
  devServer: {
    contentBase: './dist',
    host: 'localhost',      // 默认是localhost
    port: 3000,             // 端口
    open: true,             // 自动打开浏览器
    hot: true               // 开启热更新
  }
})
module.exports = devWebpackConfig;