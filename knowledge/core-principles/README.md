# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## 1. 创建项目

利用**npx create-react-app my_react**命令创建项目

- 精简项目结构

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  "sunny",
  document.getElementById('root')
);
```

## 2.创建react.js和react-dom.js文件

```js
// index.js
import React from './react';
import ReactDOM from './react-dom';

ReactDOM.render(
  "sunny",
  document.getElementById('root')
);
```

## 3.完成react-dom

我们在index.js文件中

```js
ReactDOM.render(
  "sunny",
  document.getElementById('root')
);
```

## 4. 重构render方法

```js
// react-dom.js
import $ from "jquery"
let ReactDOM = {
    render,
    rootIndex:0
}
function render(element,container){
    let unit = createUnit(element) // 将element传入createUnit方法，获得的unit是一个对象​
    let markUp = unit.getMarkUp();// 执行 unit的getMarkUp方法，获得到 真实的dom,用来返回HTML标记
    $(container).html(markUp)
}
​
export default ReactDOM
```

## 5. 实现createUnit方法

我们创建一个新的文件叫做unit.js

```js
// Unit.js
class Unit{
   
}
class TextUnit extends Unit{
    
}

function createUnit(element){
    if(typeof element === 'string' || typeof element === "number"){
        return new TextUnit(element)
    }
}

export {
    createUnit
}
```

element除了字符串 ，也有可能是 原生的标签，列如div，span等，也有可能是我们自定义的组件，所以我们先写 了一个 unit类，这个类实现 这几种element 所共有的属性。 然后 具体的 类 ，例如 TextUnit 直接继承 Unit ，再实现自有的 属性就好了。

## 6. 实现Unit

```js
class Unit{
    constructor(element){
        this._currentElement = element
    }
    getMarkUp(){
        throw Error("此方法应该被重写，不能直接被使用")
    }
}
```

getMarkUp希望是被子类重写的方法，因为每个子类执行这个方法返回的结果是不一样的。

## 7. 实现TextUnit

```js
class TextUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid
        return `<span data-reactid=${reactid}>${this._currentElement}</span>`
    }
}
```

## 8. 理解React.creacteElement方法

document有createElement()方法，React也有createElement()方法，下面就来介绍React的createElement()方法。

```js
var reactElement = ReactElement.createElement(
  	... // 标签名称字符串/ReactClass,
  	... // [元素的属性值对对象],
  	... // [元素的子节点]
)
```

1、参数：

- 1）第一个参数：可以是一个html标签名称字符串，也可以是一个ReactClass（必须）；

- 2）第二个参数：元素的属性值对对象（可选），这些属性可以通过this.props.*来调用；

- 3）第三个参数开始：元素的子节点（可选）。

2、返回值：**一个给定类型的ReactElement元素**

```js
// index.js
import React from './react';
import ReactDOM from './react-dom';

var li1 = React.createElement('li', {onClick:()=>{alert("click")}}, 'First');
var li2 = React.createElement('li', {}, 'Second');
var li3 = React.createElement('li', {}, 'Third');
var ul = React.createElement('ul', {className: 'list'}, li1, li2, li3);
console.log(ul);
ReactDOM.render(ul,document.getElementById('root'))
```

ReactElement.createElement方法将生产一个给定类型的ReactElement元素，然后这个对象被传入 render方法，然后进行了上面讲到的 createUnit和getMarkUp操作。

## 9. 实现React.createElement方法

```js
// element.js
class Element {
    constructor(type,props){
        this.type = type
        this.props = props
    }

}
function createElement(type,props={},...children){
    props.children = children || [];
    return new Element(type,props)
}

export {
    Element,
    createElement
}
```

我们 定义了一个 Element 类 ，然后在createElement方法里创建了这个类的对象， 并且return出去了

我们应当是这样React.createElement()调用这个方法的，所以我们要把这个方法挂载到react身上。

```js
 // react.js
 import {createElement} from "./element"
 const React = {
    createElement
 }
 export default React
```

## 10. 实现NativeUnit

上面实现了 createElement返回 给定类型的ReactElement元素 后，就将改元素传入，render方法，因此 就会经过 createUnit方法， createUnit方法判断是属于什么类型的 元素，如下面代码

```js
// Unit.js
import {Element} from "./element" // 新增代码
class Unit{
    constructor(element){
        this._currentElement = element
    }
    getMarkUp(){
        throw Error("此方法应该被重写，不能直接被使用")
    }
}
class TextUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid
        return `<span data-reactid=${reactid}>${this._currentElement}</span>`
    }
}

function createUnit(element){
    if(typeof element === 'string' || typeof element === "number"){
        return new TextUnit(element)
    }
    // 新增代码
    if(element instanceof Element && typeof element.type === "string"){
        return new NativeUnit(element)
    }
}

export {
    createUnit
}
```

