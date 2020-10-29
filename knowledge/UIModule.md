<!--
 * @Author: Li Zhiliang
 * @Date: 2020-10-28 12:00:00
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2020-10-29 09:54:24
 * @FilePath: /React-learning/knowledge/UIModule.md
-->

# UI 组件库

项目中，PC端和移动端分别选择了 Ant Design 和 Ant Design Mobile 作为 UI 组件库。

安装

```js
// antd@4.6.6、antd-mobile@2.3.4
npm install antd antd-mobile --save
```

## 1. antd

在 index.js 中引入 antd 的样式文件 import 'antd/dist/antd.less'。

:::tips
antd 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。
:::

## 2. [antd-mobile](https://mobile.ant.design/docs/react/use-with-create-react-app-cn)

目前 antd-mobile 还需要手动实现按需加载。

修改 config-overrides.js 文件：

```js
const { override, fixBabelImports } = require('customize-cra')
// ...
module.exports = {
  webpack: override(
    customWebpack(),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: true
    })
  )
}
```

## 3. 新增 less 支持和定制主题

### 新增 less 支持

完成上面两步后，此时引用组件进行测试会发现，组件样式没有起作用。这是因为 CRA 创建的项目，默认是不支持编译 less 文件的，所以我们需要通过 config-overrides.js 扩展 webpack 的相关配置。（这里是需要安装 less 和 less-loader 的，前面已经安装过的，这里就跳过啦）（另外最近 Antd 官网也在一直更新，原先官网的例子是 addLessLoader，现在改成了引入 craco-less 来帮助加载 less 样式和修改变量，大家可以都尝试一下哦）。

完整的 config-overrides.js：

```js
const { override, addLessLoader, fixBabelImports } = require('customize-cra')

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index-m.js',
    template: 'public/mobile.html',
    outPath: '/mobile.html'
  }
])

const customWebpack = () => config => {
  multipleEntry.addMultiEntry(config)
  return config
}

module.exports = {
  webpack: override(
    customWebpack(),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
        }
      }
    }),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: true
    })
  )
}
```

重新运行项目，对应的组件样式就可以生效了。

### 定制主题

在上面的配置中，我们可以通过 modifyVars 修改 antd 和 antd-mobile 的主题样式，例如：主题色、文本颜色、圆角等。

样例：

```js
// ...
addLessLoader({
  lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#4085F5',
      '@text-color': 'rgba(0, 0, 0, 0.65)',
      '@brand-primary': '#4085F5',
      '@fill-body': '#F7F8FA',
      '@color-text-base': '#333333',
    },
  }
})
//...
```


