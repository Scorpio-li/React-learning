## 路由

### 1. 静态路由配置

用过 Vue 的同学都知道，在 Vue 里面，vue-router 为我们提供了许多 便利，像静态路由配置和导航守卫等。而在 React 里，这些都需要我们自己手动实现。

React 静态路由配置的依赖在 github 上已经有大佬为我们提供了：react-router-config。

安装 react-router-config，这是一个 React 路由器的静态路由配置帮助程序。

```js
// react-router-config@5.1.1
npm install react-router-config --save
```

它提供了两个方法：matchRoutes 和 renderRoutes，我们主要看一下 renderRoutes。

先看源码（node_modules/reactrouter-config/modules/renderRoutes.js）：

```js
import React from "react";
import { Switch, Route } from "react-router";

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;
}

export default renderRoutes;
```

源码的内容很简单，就是将 routes 进行 map 处理。可能有同学会有疑问：为什么我们要使用这种方式加载路由呢？我的理解是，让我们的程序更简洁、更可控。

- 更简洁：可以模拟 Vue 中路由的写法，实现静态路由配置，路由结构清晰明了；同时当项目中有多种布局时，我们可以更清晰地书写路由和注册路由。

- 更可控：在 React 里面，相信大家都遇到过内存泄露的问题，举一个最常见的例子：页面跳转的时候，接口请求未结束，同时在回调里面执行了页面相关的操作。这个时候就好产生内存泄露的问题。关于这个问题，我的思路是在页面跳转时，取消未结束的请求（具体还要看业务情况）。而 “取消” 的这一动作我们可以放在 renderRoutes 中进行（在我看来就是导航守卫了）。

新建 route/renderRoutes.js，将依赖包中的源码复制进去，这样我们就可以根据需要进行扩展了。

新建 route/index.js：

```js
const routes = [
  { path: '/login', exact: true, component: Login},
  { path: '/404', component: NotFound},
  { 
    path: '/goods', component: GoodsLayout,
    routes: [
      { path: '/goods/list', component: GoodsList}
    ]
  },
  {
    component: BasicLayout,
    routes: [
      { path: '/', exact: true, component: Home},
      { path: '/home2', exact: true, component: Home2 },
      { path: '/home3', exact: true, component: Home3 }
    ]
  }
]
```

到这里，静态路由配置已经完成了。关于使用方式，具体可以参照 github 上 react-router-config 的介绍。

### 2. 扩展

有了上面 renderRoutes.js 之后，我们就对路由的大部分功能进行统一实现和管理了，例如路由鉴权、取消请求等。

简单看一下路由鉴权的实现，修改 renderRoutes.js：

```js
import React from 'react'
import { Switch, Route } from 'react-router'

function renderRoutes(routes, authed, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            
            if (route.auth && !route.auth.includes(authed)) {
              // 进行拦截
            }

            return route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
          }
        />
      ))}
    </Switch>
  ) : null
}

export default renderRoutes
```

这里是通过传入 authed（当前用户的权限），在 render 方法中进行判断：如果该用户具备权限进入目标页面的权限，则正常跳转，否则进行拦截并作出对应的处理。

