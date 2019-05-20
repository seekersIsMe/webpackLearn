## 减少resolve解析
```
resolve: {
modules: [
    path.resolve(__dirname, 'node_modules'), // 使用绝对路径指定 node_modules，不做过多查询
],

// 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
// 其他文件可以在编码时指定后缀，如 import('./index.scss')
extensions: [".js"], 

// 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
mainFiles: ['index'],
}
```
********
## 把 loader 应用的文件范围缩小,只在最少数必须的代码模块中去使用必要的 loader
```
rules: [ 
  {
    test: /\.jsx?/,
    include: [ 
      path.resolve(__dirname, 'src'), 
      // 限定只在 src 目录下的 js/jsx 文件需要经 babel-loader 处理
      // 通常我们需要 loader 处理的文件都是存放在 src 目录
    ],
    use: 'babel-loader',
  },
  // ...
],
```
***********
## 减少 plugin 的消耗,webpack 的 plugin 会在构建的过程中加入其它的工作步骤，如果可以的话，适当地移除掉一些没有必要的 plugin。
* webpack 4.x 的 mode，区分 mode 会让 webpack 的构建更加有针对性，更加高效。例如当 mode 为 development 时，webpack 会避免使用一些提高应用代码加载性能的配置项，如 UglifyJsPlugin，ExtractTextPlugin 等，这样可以更快地启动开发环境的服务，而当 mode 为 production 时，webpack 会避免使用一些便于 debug 的配置，来提升构建时的速度，例如极其消耗性能的 Source Maps 支持。

