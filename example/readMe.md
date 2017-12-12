## 项目结构
```markdown
├── build   (打包生成:本地:npm run build)
│
├── common  (存放公共方法)
│ │
│ └── fetch (封装fetch请求)
│ │
│ └── reducermanager
│ │ │
│ │ └─── reducermain  (各页面reducer汇总入口,高阶组件解决离开页面数据恢复问题)
│ │ │
│ │ └─── rtrdcon (高阶组件解决离开页面数据恢复问题)
│ │
│ └── AsyncComponent (react异步加载组件)
│ │
│ └── modalTip (design弹框)
│ │
│ └── TypeEnumeration (存放各个页面reducer的action的type)
│
├── dist    (打包生成:线上:npm run dist)
│
├── modules
│ │
│ └── components (react组件)
│ │
│ └── css      (存放所有css)
│ │
│ └─── **page**     (各个页面代码文件)
│ │ │
│ │ └─── actions  (当前页面的action层:执行请求数据处理 view-control)
│ │ └─── index    (当前页面的的页面层:页面渲染 view)
│ │ └─── reducers (当前页面的的reducers层:存取值 store)
│ │
│ └── app      (react路由)
│
├── node_modules  (打包生成:node依赖包)
│
├── util   (存放工具方法)
│
├── views  (入口页面模板)
│
├── .babelrc   (babel配置文件)
│
├── assets-views   (webpack打包文件工具)
│
├── package   (node依赖包配置)
│
├── readMe   (！！！！！！读我)
│
├── webpack.config   (本地打包配置:不压缩)
│
└── webpack.production.config   (线上打包配置:压缩)
```
