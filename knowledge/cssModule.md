## CSS Module

使用 [name].module.css 文件命名约定支持 CSS Module 和常规 CSS 。 CSS Module 允许通过自动创建 [filename]\_[classname]\_\_[hash] 格式的唯一 classname 来确定 CSS 的作用域。

项目中我们使用了 Less 作为预处理器，而让其支持 CSS Module 需要修改 webpack 的配置。值得庆幸的是，上面我们使用了 react-app-rewired 的形式修改 CRA 的相关配置，同时也使用了 addLessLoader 方法来进行一些扩展。而 addLessLoader 默认已经帮我们修改了 webpack 中的相关  less-loader 的配置，所以我们可以直接使用 [name].module.less。

- 我们可以简单看一下 addLessLoader 这部分的源码：

    1. 默认处理后的样式名，格式为 [local]--[hash:base64:5]；
    
    2. 通过两个正则来区分 .less 和 .module.less 两种类型。

### 测试

新建 style/base.module.less：

```less
.baseContainer {
  padding: 50px;
  .title {
    color: pink;
  }
  .fontSize {
    font-size: 20px;
  }
}
```

修改 App.js:

```js
import React from 'react'
import style from './style/base.module.less'

function App() {
  return (
    <div className={style.baseContainer}>
      <div className={`${style.title} ${style.fontSize}`}>App</div>
    </div>
  )
}

export default App
```

