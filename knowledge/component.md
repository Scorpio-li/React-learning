<!--
 * @Author: Li Zhiliang
 * @Date: 2021-01-12 10:46:52
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2021-01-12 10:50:18
 * @FilePath: /React-learning/knowledge/component.md
-->

# 组件的创建

在react中，组件分为两种，类组件 和 函数式组件

- 简单功能 使用 函数式组件

- 复杂功能 使用 类组件

- 组件名都必须大写

## 类组件

使用ES6创建Class的方式来实现一个组件类

- 首字母要大写

- 要继承 React中的Component类

- 必须实现render函数，函数内返回标签

- 组件有自己的state和生命周期

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

 class App extends Component {
  render() {
    return (
      <div>
        嘿嘿嘿
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```

## 函数式组件

> 也叫做无状态组件，简单功能的组件可以使用函数式组件，性能更高。

函数式组件其实就是一个函数，只不过函数内部需要返回对应的标签

- 首字母要大写

- 函数内要返回标签

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const App = () => {
  return (
    <div>简单的函数式组件</div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 小结

- 函数式组件性能更高，因为没有生命周期

- 函数式组件更方便进行测试

- 能不用类组件就不用类组件

- 当要使用 state 时，就要使用类组件
