<!--
 * @Author: Li Zhiliang
 * @Date: 2021-01-12 10:27:09
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2021-01-12 10:38:37
 * @FilePath: /React-learning/knowledge/jsx.md
-->
# JSX

## JSX表达式

1. 普通渲染

```js
    <h1>我就是jsx</h1>
```

2. 数学表达式

```js
    <h1>{1 + 1}</h1>
```

3. 字符串

```js
    <h1>{'hello world'}</h1>
```

4. bool类型-无法渲染

```js
    <h1>{isBoy}</h1>
```

5. 使用变量

```js
    <h1>{msg}</h1>
```

6. 三目运算符

```js
    <h1>{isBoy ? "男生" : "女生"}</h1>
```

7. 调用方法

```js
  const format = (msg) => {
     return '---' + msg + '---';
   }    

  <h1>{format(msg)}</h1>
```

8. 使用对象

```js
   const lamian = {
     name: "拉面"
   };

  <h1>{lamian.name}</h1>
```

## JSX嵌套语法与循环

```js
import React from 'react';
import ReactDOM from 'react-dom';

const list = ['苹果', '香蕉', '雪梨', '西瓜'];

const App = () => {
  return (
    <div >
      {
        <div>
          {
            list.map(v => <h1 key={v}>{v}</h1>) // 遍历数组
          }
        </div>
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## JSX标签属性

jsx标签上可以设置绝大部分html标签的属性，如 checked、图片的src等，但需要注意几个点：

1. html的class属性改为className

```js
     <div className="redCls">👍💯☁️</div>
```

2. html中label标签的for属性改为htmlFor

```js
  <label htmlFor="inp">
          点我点我
            <input id="inp" type="text" />
  </label>
```

3. 标签中的自定义属性使用data

```js
  <div data-index={'hello'} >自定义属性</div>
```

4. 渲染 html字符串 使用 dangerouslySetInnerHTML 属性

```js
  <li dangerouslySetInnerHTML={{__html:"<i>来啊呀</i>"}}></li>
```

5. bool类型的值 可以这样用

```js
  <input type="checkbox" checked={true} />
```

6. 当属性太多了，可以使用 ... 扩展运算符

```js
  const props={
   className:"redCls",
   "data-index":5
  }

 <div {...props}>展开属性</div>
```

7. 行内样式的写法

```js
  <div style={{ color: 'yellow', fontSize: "150px", "backgroundColor": 'red' }} > 颜色真不错</div>
```

> tips: 在vscode上安装插件：vscode-styled-jsx，高亮jsx代码，提高编程体验。

