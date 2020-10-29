<!--
 * @Author: Li Zhiliang
 * @Date: 2020-10-28 11:16:10
 * @LastEditors: Li Zhiliang
 * @LastEditTime: 2020-10-28 11:28:07
 * @FilePath: /React-learning/knowledge/environmentConfig.md
-->

# 多环境配置

在开发过程中，项目会存在多个环境：开发、测试、uat、生产等，我们会根据各个环境对项目进行部署，这个时候就需要通过 dotenv 将对应环境的 .env 文件中的环境变量加载到 process.env 中，从而实现多环境配置（[官网](https://www.html.cn/create-react-app/docs/adding-custom-environment-variables/)）

1. 在项目根目录下分别新建以下文件，并添加环境变量 BASE_URL

    - .env：用来设置一些公共的配置。

    - .env.development：开发环境配置，添加变量：REACT_APP_BASE_URL=development.api.com

    - .env.test：测试环境配置，添加变量：REACT_APP_BASE_URL=test.api.com

    - .env.production：生产环境配置，添加变量：REACT_APP_BASE_URL=production.api.com

2. 修改 package.json 文件中的 scripts：

```json
"scripts": {
    "start": "react-app-rewired start",
    "build:dev": "dotenv -e .env.development react-app-rewired build",
    "build:test": "dotenv -e .env.test react-app-rewired build",
    "build:prod": "dotenv -e .env.production react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

3. 在根目录下新建 config-overrides.js 文件

当我们通过 react-app-rewired 对项目进行运行/打包的时候，会先读取 config-overrides.js 中的相关配置，对原有的 webpack 配置规则进行修改，然后再进行打包。这里我们就先创建一个空的 config-overrides.js 文件，后面再根据项目需要进行配置。

4. 测试

通过上面的配置，我们可以通过 process.env 访问配置中的环境变量，并且根据不同的编译命令，运行/打包各环境的代码。

执行 npm start，启动项目。在 App.js 中打印 process.env.REACT_APP_BASE_URL，我们可以看到控制台输出了 development.api.com（其他环境可以自行测试，这里就不赘述了。另外，如果修改环境变量的文件或 config-overrides.js 中的内容，是需要重新执行 npm start 才会生效哦）

