<!--
 * @Author: Li Zhiliang
 * @Date: 2020-10-29 11:03:06
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2020-10-29 11:11:46
 * @FilePath: /React-learning/knowledge/axios.md
-->

## Axios取消请求
[地址](https://juejin.im/post/6887935122562613261?utm_source=gold_browser_extension)
在 react 里面，相信很多同学都遇到过内存泄露的问题，主要是由于在页面卸载之后，执行了状态更新。比较典型的就是异步请求回调之后执行了 setData 相关的操作。

目前项目中我们使用的比较多的是 axios， axios 为我们提供了两种取消方式。

从文档中，我们可以知道第一种方式可以取消多个请求，而第二个只能取消某一个。所以这里就先直接选择第一种（个人觉得实际应用中大部分时候都是取消多个请求，所以主要看第一种）。



### 1. 简单封装 axios

#### 安装

```js
// axios@0.19.2、express@4.17.1
npm install axios express --save
```

#### 新建 server/index.js：

- 先准备两个接口，并设置 2s 延迟，便于测试。

```js
const express = require('express')
const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200)
  } else next()
})

app.get('/api/test', function (req, res) {
  setTimeout(() => {
    res.send('测试结果')
  }, 2000)
})
app.post('/api/test2', function (req, res) {
  setTimeout(() => {
    res.send('测试结果')
  }, 2000)
})

let server = app.listen(9999, function () {

  let host = server.address().address
  let port = server.address().port

  console.log('访问地址为：', host, port)
})
```

- 新建 utils/request：

```js
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:9999',
  timeout: 20000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
```

- 新建 model/index.js：

```js
import fetch from '../utils/request.js'

class Model {

  api(options = {}) {
    if (!options.method) options.method = 'get'

    return new Promise((resolve, reject) => {
      let request
      let config = {
        method: options.method,
        url: options.url,
      }

      switch (options.method) {
      case 'get':
        request = fetch({
          ...config,
          params: options.params
        })
        break
      case 'post':
        request = fetch({
          ...config,
          data: options.data
        })
        break
      default:
      }
      request
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }

  get (options = {}) {
    options.method = 'get'
    return this.api(options)
  }

  post (options = {}) {
    options.method = 'post'
    return this.api(options)
  }
}

export default Model
```

- 新建 model/common.js：

```js
import Model from './index'

class Common extends Model {
  getTest(options = {}) {
    options.url = '/api/test'
    return this.get(options)
  }
  getTest2(options = {}) {
    options.url = '/api/test2'
    return this.post(options)
  }
}

const commonModel = new Common()
export default commonModel
```

#### 使用

```js
import React, { useState } from 'react'
import { Button } from 'antd'
import commonModel from '@/model/common'

function Index2() {

  const [test, setTest] = useState(0)

  const sendRequest = () => {
    commonModel.getTest().then((data) => {
      setTimeout(() => {
        setTest(1)
      }, 1000)
    })
    commonModel.getTest2().then((data) => {
      setTest(123)
    })
  }

  return (
    <div>
      <div>概览2</div>
      <div>{test}</div>
      <Button onClick={sendRequest}>send request</Button>
    </div>
  )
}

export default Index2
```

点击按钮发送请求，页面显示 test 值先为 123，后为 1，则 axios 配置成功。

模拟一下内存泄露：打开控制台，点击按钮发送请求，两秒之内跳转其他页面，我们可以看到以下错误：

这是因为当我们跳转页面时，上一个页面的请求没有结束，且触发了状态更新，然后导致了内存泄漏。下面我们就来解决这个问题。

### 2. axios.CancelToken

- 修改 utils/request.js：

```js
// ...
const getCancelToken = () => {
  let CancelToken = axios.CancelToken
  let source = CancelToken.source()
  return source
}
// ...
service.interceptors.request.use(
  (config) => {
    config.cancelToken = config.cancel_token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// ...
export {
  getCancelToken
}
```

- 修改 model/index.js：

```js
// ...
return new Promise((resolve, reject) => {
      let request
      let config = {
        method: options.method,
        url: options.url,
      }
      if (options.cancel_token) config.cancel_token = options.cancel_token

      switch (options.method) {
//...
```

- 重复上面的测试过程，我们会发现控制台打印了两次：“取消请求”，同时内存泄露的问题也没有再发生了。

- 简单梳理一下思路：
    
    - 给需要 “取消请求” 的方法传入 cancel_token；
    
    - 通过 model/index.js 传给 utils/request.js；
    
    - utils/request.js 接收 cancel_token，并添加到 axios 的请求拦截器的配置中。
    
    - 页面卸载时，调用 cancel 方法，取消请求。

如果每个页面都去做这样的处理，那就太麻烦了。是否可以有公共的地方去处理 “取消请求” 呢？

答案是肯定的~，首先取消请求的动作是在页面卸载（路由发生改变）的时候执行的，结合上面的 renderRoutes

### 3. 统一处理

思路就是通过一个标识，用于区分在路由切换的时候需要取消请求的 api；对这些标记过的 api 添加 cancel_token；最后在路由切换时取消这些 api的请求。

- 新建 utils/global.js，用于存储 cancel_token 和 cancel 方法。

```js
let global = {
  source: {
    token: null,
    cancel: null
  },
  timestamp: null
}

const changeGlobal = (key, value) => {
  global[key] = value
}

export {
  global,
  changeGlobal
}
```

- 修改 modal/common.js，通过变量 needCancel 标记哪些接口需要 “取消”。

```js
import Model from './index'

class Common extends Model {
  getTest(options = {}) {
    options.url = '/api/test'
    options.needCancel = true
    return this.get(options)
  }
  getTest2(options = {}) {
    options.url = '/api/test2'
    options.needCancel = true
    return this.post(options)
  }
}

const commonModel = new Common()
export default commonModel
```

- 修改 modal/index.js，对标记的接口添加 cancel_token。

```js
import fetch from '../utils/request.js'
import { global } from '../utils/global'

class Model {
// ...
      if (options.needCancel && global.source) config.cancel_token = global.source.token

      switch (options.method) {
// ...
```

- 修改 route/renderRoutes.js，

```js
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { getCancelToken } from '@/utils/request'
import { global, changeGlobal } from '../utils/global'

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
            // 生成新的 cancel_token
            if (global.source.token && global.source.cancel) global.source.cancel('取消请求')
            changeGlobal('source', getCancelToken())
            changeGlobal('timestamp', new Date().getTime())
// ...
```



