<!--
 * @Author: Li Zhiliang
 * @Date: 2021-01-12 10:51:23
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2021-01-12 11:00:03
 * @FilePath: /React-learning/knowledge/stateprop.md
-->

# 状态和属性

在React中，用状态(state)和属性(props)来实现数据动态化。下面分别来讲讲这两个概念。

## 状态：state

- 在react中，组件内部的数据是通过state来实现和管理

- 可以理解为state就是Vue中的data

### 为什么需要state？

我们之前使用变量，都是脱离了组件本身。而组件自身是应该具有私有和独立的数据（状态）的，这个私有的数据和状态就叫做 state，以后，只要说到数据的状态 那么就是指类组件中的state

> ⚠️：函数式组件没有自己的state

### state的声明和使用（两种方式）

1. 类属性的方式声明

```jsx
 class Person extends Component {
  // 1 声明 state
  state = {
    date: "2021",
    msg: "你好"
  }
  render() {
    return (
      <div>
        {/* 2 使用state */}
        <h1>{this.state.date}</h1>
        <h2>{this.state.msg}</h2>
      </div>
    )
  }
}
```

2. 构造函数中声明

```jsx
 class Person extends Component {
  // 1 构造函数中 声明 state
  constructor() {
    // 1.1 必须在this之前调用super()方法
    super();
    this.state = {
      date: "2009",
      msg: "天啊天啊"
    }
  }
  render() {
    return (
      <div>
        {/* 2 使用state */}
        <h1>{this.state.date}</h1>
        <h2>{this.state.msg}</h2>
      </div>
    )
  }
}
```

### state的赋值（注意区别赋值和声明）

- state的赋值方式只能通过 this.setState方法 来实现。

> 需要注意的是， 不能 使用 this.state.date= 200 直接修改，否则会报错。

- state的赋值是异步的。

> react为了优化性能，将state的赋值代码 改成异步的方式，可以避免反复的设置state而引发的性能损耗问题。

有时候，setState还可以接收一个函数，函数内可以实时获取state中的值，不存在延迟

```jsx
    this.setState(preState => {
      console.log("上一次的state", preState.date);
      return {
        date: preState.date + 1000
      }
    })

    this.setState(preState => {
      console.log("上一次的state", preState.date);
      return {
        date: preState.date + 1
      }
    })
```

## 属性 props

props意思是属性，一般存在父子组件中。主要用于 父向子传递数据。

1. 声明父组件，并在标签上通过属性的方式进行数据传递

```jsx
   import HomeTop from '相对路径'		// 引入子组件
   import HomeFooter from '相对路径'
   
   class Home extends Component {
     state = {
       color: "blue",
       size: 100
     }
     render() {
       return (
         <div>
           <HomeTop acolor={this.state.color} asize={this.state.size} ></HomeTop>
           <HomeFooter bcolor={this.state.color} bsize={this.state.size}  ></HomeFooter>
         </div>
       )
     }
   }
```

> 需要注意的是 父组件中的变量名是 color,size 而 HomeTop 和 HomeFooter 中 修改了一下变量名，分别是acolor asize 和 bcolor bsize，请注意联系。

2. 声明一个类组件 HomeTop，通过 this.props 来获取父组件的数据

```jsx
   class HomeTop extends Component {
     render() {
       return (
         <h1>屋顶的颜色是 {this.props.acolor} 尺寸 {this.props.asize}</h1>
       )
     }
   }
```

3. 声明一个函数式组件HomeFooter，父组件传递的数据 需要在函数的形参props上接收

```jsx
   const HomeFooter = (props) => {
     return <h1>屋底的颜色是 {props.bcolor}  尺寸 {props.bsize}</h1>
   }
```
