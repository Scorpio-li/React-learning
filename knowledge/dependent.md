<!--
 * @Author: Li Zhiliang
 * @Date: 2020-10-28 11:05:46
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2020-10-28 11:14:00
 * @FilePath: /React-learning/knowledge/dependent.md
-->
## 项目中需要安装到的依赖

1. react-router-dom

提供路由功能。

```js
// react-router-dom@5.2.0
npm install react-router-dom
```

2. redux、react-redux、redux-thunk

    - redux：管理程序状态（数据状态）。
    
    - react-redux：react-redux 是 redux 的作者封装的一个 react 专用的库。
    
    - redux-thunk：让原本只能接受对象的 store.dispatch 变成可以接收对象/方法，并且如果接收了一个方法后自动执行该方法，而不触发 redux 的 store 更新。

```js
// redux@4.0.5、react-redux@7.2.1、redux-thunk@2.3.0
npm install redux react-redux redux-thunk
```

3. redux-devtools-extension

store 数据管理调试工具。

```js
// redux-devtools-extension@2.13.8
npm install redux-devtools-extension
```

4. immer、use-immer

    - immer：实现 js 的不可变数据结构。

    - use-immer：提供 useImmer 方法。
```js
// immer@7.0.9、use-immer@0.4.1
npm install immer use-immer
```

5. react-app-rewired、customize-cra、react-app-rewire-multiple-entry

    - react-app-rewired：是修改 CRA 配置的工具，提供在不暴露项目配置的情况，修改项目配置的功能。
    
    - customize-cra：提供帮助方法，用于修改 webpack 配置。
    
    - react-app-rewire-multiple-entry：添加多页入口。

```js
// react-app-rewired@2.1.6、customize-cra@1.0.0、react-app-rewire-multiple-entry@2.2.0
npm install react-app-rewired customize-cra  --save-dev
```

6. dotenv-cli

将 .env 文件中的环境变量加载到 process.env。

```js
// dotenv-cli@4.0.
npm install dotenv-cli --save-dev
```

7. less、less-loader

    - less：CSS 预处理语言。

    - less-loader：webpack 将less 编译成 css 的 loader。

```js
//  less@3.12.2、less-loader@7.0.1
npm install less less-loader --save-dev
```