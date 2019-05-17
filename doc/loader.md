## resolve
* 用于匹配 resource 路径的方法：
* { test: ... } 匹配特定条件
* { include: ... } 匹配特定路径
* { exclude: ... } 排除特定路径
* { and: [...] }必须匹配数组中所有条件
* { or: [...] } 匹配数组中任意一个条件
* { not: [...] } 排除匹配数组中所有条件

> 上述的所谓条件的值可以是：

* 字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
* 正则表达式：调用正则的 test 方法来判断匹配
* 函数：(path) => boolean，返回 true 表示匹配
* 数组：至少包含一个条件的数组
* 对象：匹配所有属性值的条件
*******
## 其他的配置字段
* **options 给对应的 loader 传递一些配置项**
* **use 字段可以是一个数组，也可以是一个字符串或者表示 loader 的对象**
*******
## loader执行的顺序
* module.rules中从后往前执行
* 多个 rule 匹配了同一个模块文件，这个是无法保证这些rule的执行顺序，当然可以配置enforce，其有两个属性（`pre`、`post`）
  分别对应前置类型或后置类型的loader。
* 前置 -> 行内 -> 普通 -> 后置的顺序执行。行内loader即例如`const json = require('json-loader!./file.json')`

## module.noParse 字段
* 可以用于配置哪些模块文件的内容不需要进行解析。对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。
> 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。
```
module.exports = {
  // ...
  module: {
    noParse: /jquery|lodash/, // 正则表达式

    // 或者使用 function
    noParse(content) {
      return /jquery|lodash/.test(content)
    },
  }
}
```
