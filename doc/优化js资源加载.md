## 按需加载
* 在webpack中按需加载代码模块比较简单，采用动态加载语法import来编写代码即可
  ```
    // import 作为一个方法使用，传入模块名即可，返回一个 promise 来获取模块暴露的对象
    // 注释 webpackChunkName: "lodash" 可以用于指定 chunk 的名称，在输出文件时有用
    // import 后面的注释 webpackChunkName: "lodash" 用于告知 webpack 所要动态加载模块的名称
    import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => { 
    console.log(_.lash([1, 2, 3])) // 打印 3
    }
    // 需要在配置下输出代码块的文件名
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称
    }
  ```
## Tree shaking删除不用的代码
    ```
    // src/math.js
    export function square(x) {
    return x * x;
    }

    export function cube(x) {
    return x * x * x;
    }

    // src/index.js
    import { cube } from './math.js' // 在这里只是引用了 cube 这个方法

    console.log(cube(3))
    ```
* 如果整个项目代码只是上述两个文件，那么很明显，square 这个方法是未被引用的代码，是可以删掉的。在 webpack 中，只有启动了 JS 代码压缩功能（即使用 uglify）时，会做 Tree shaking 的优化。webpack 4.x 需要指定 mode 为 production，而 webpack 3.x 的话需要配置 UglifyJsPlugin。启动了之后，构建出来的结果就会移除 square 的那一部分代码了。

* 如果你在项目中使用了 Babel 的话，要把 Babel 解析模块语法的功能关掉，在 .babelrc 配置中增加 "modules": false 这个配置：
    ```
    {
    "presets": [["env", { "modules": false }]]
    }
    ```
## sideEffects
* lodash是一个工具库，提供了大量的对字符串、数组、对象等常见数据类型的处理函数，但是有的时候我们只是使用了其中的几个函数，全部函数的实现都打包到我们的应用代码中，其实很浪费。
* lodash 的 ES 版本 的 package.json 文件中已经有 sideEffects: false 这个声明了，当某个模块的 package.json 文件中有了这个声明之后，webpack 会认为这个模块没有任何副作用，只是单纯用来对外暴露模块使用，那么在打包的时候就会做一些额外的处理。
```
import { forEach, includes } from 'lodash-es'

forEach([1, 2], (item) => {
  console.log(item)
})

console.log(includes([1, 2, 3], 1))
//最终 webpack 不会把 lodash-es 所有的代码内容打包进来，只是打包了你用到的那两个方法，这便是 sideEffects 的作用。
```