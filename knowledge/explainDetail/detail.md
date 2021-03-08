<!--
 * @Author: Li Zhiliang
 * @Date: 2021-03-05 15:16:27
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2021-03-08 00:50:45
 * @FilePath: /React-learning/knowledge/explainDetail/detail.md
-->
# React学习

## React实例

React也是同理，但是它是将组件一层层包裹，通过context上下文和props来传递，添加React的周边生态：路由 **react-router-dom** 、国际化 **react-i18next** 、状态管理 **react-redux** ，同时使用 **react-dom**提供的ReactDom 来将页面渲染到相应的#app节点上

```js
ReactDom.render(
    <StoreProvider>
        <I18n>
            <BrowerRouter>
                {route}
            </BrowerRouter>
        </I18n>
    </StoreProvider>,
    document.getElementById('app'),
)
```

## React模板

对于比React来看，它是纯JavaScript编写代码来渲染dom和处理逻辑，定义state的值来控制页面的渲染，render里return标签来生成dom节点。

```js
//react的jsx语法
class Hello extends React.Component{
    state = {
        msg:'hello React!'
    }
    render(){
        const {msg} = this.state;
        return(
            <div className = 'text'>
                {msg}
            </div>
        )
    }
}
```

React定义的 msg属性 放在 this.state 上的，但是却需要用 this.state.msg 取值，模板里使用 单括号。

## 常用指令

### v-if和v-show

React对于 v-if 一般可以用 三目表达式 表示，对于 v-show 可以对 style 直接赋值切换

```js
//React
class Hello extends React.Component{
    state = {
       flag:'1',
       show: false
    }
    render(){
        const { flag,show } = this.state;
        return(
            <div id='app'> 
            //对于v-if的模拟
              {
                   flag === '0' ? 
                   (
                       <div>
                           类似于Vue里的v-if
                       </div>
                   )
                   : flag === '2' ?
                   (
                       <div>
                           类似于Vue里的v-else-if
                       </div>
                   )
                   :
                   (
                       <div>
                           类似于Vue里的v-else
                       </div>
                   )
              }
              //对于v-show的模拟
              <div style={show ? {} : {display:'none'}}>
                  类似于Vue里的v-show
              </div>
            </div>
        )
    }
}
```

### 绑定事件

事件驱动还是以on开头进行编写，如onClick、onChange等

```js
class Hello extends React.Component{
    state = {
       num:0
    }
    
    add = e => {
        e.preventDefault();
        this.setState((state)=>({
            num: state.num+1 
        }))
    }
    
    render(){
        const {num} = this.state;
        return(
            <div id='app'> 
                <span>{{ num }}</span>
                <button onClick={this.add}>
                  增加
                </button>
            </div>
        )
    }
}
```

### React列表渲染

```js
//React
class Hello extends React.Component{
    state = {
       items: [       
                { message: 'Foo' },       
                { message: 'Bar' }     
            ]
    }
    
    render(){
        const {items} = this.state;
        return(
            <div id='app'> 
                <ul id="example">
                    {
                        items.map((item,index)=>{
                            return(
                            <li  
                              key={item.message}
                            >     
                              { item.message } - {index}
                             </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
```

React的 setState 机制是直接赋值，所以使用push、pop等改变原数组的操作时，需要先取 原始值 再赋值给 state。

```js
class Hello extends React.Component{
    state = {
       arr:[1,2,3]
    }
    
    addArr = ()=>{
        //使用浅拷贝复制数组再执行添加
        const data = this.state.arr.concat();
        data.push(4)
        this.setState({
          arr: data
        })

    }
    
    filterArr = ()=>{
        //由于filter返回一个新数组，这里正好返回给arr
        this.setState((state)=>({
            arr: state.arr.filter(item => item > 2)
        }))
    }
    
    render(){
        const {arr} = this.state;
        return(
            <div id='app'> 
                <span>{ arr }</span>
                <button onClick={this.filterArr}>
                      添加数字
                </button>
                <button onClick={this.filterArr}>
                      筛选大于等于3的数
                </button>
            </div>
        )
    }
}
```

### React的组件传值与插槽

React 的插槽比较简单，就是一个包裹 this.props.children 就可以了。具体原因主要是React的每个 JSX 元素只是调用 React.createElement(component, props, ...children) 的语法糖，相当于是自带插槽。

React 的子组件向父组件传递时，无论是 触发方法 还是获取父组件传递下来的 属性值 ，都是使用 this.props.[protoitype] 的方式命名。

```js
class Child extends React.Component{
    
    say = ()=>{
        console.log('触发子方法');
        //直接定义say方法到父组件里提供调用
        this.props.say();    
    }
    
    render(){
        const {msg,children} = this.props;
        return(
            <div id='app'> 
                <div onClick={this.say}>
                    {msg}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

class Parent extends React.Component{

    state = {
        msg: '传递给子组件的值'
    }
    
    say = ()=>{
        console.log('父组件里触发方法');    
    }
    
    render(){
        const {msg} = this.state;
        return(
            <div> 
                <Child msg={msg} say={this.say}>
                    <div>
                        插槽文字
                    </div>
                </Child>
            </div>
        )
    }
}
```


