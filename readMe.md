*为了更好的使用Redux，进行二次封装*

### redux存在的问题
* 一份store树，离开页面再次进入，数据不会初始化
* reducer拆分造成汇总困难
* action的type管理混乱，重复问题
* 繁杂的使用规则，index页面action和store引入，纯函数reducer大量case仅仅为了改变一个值

### 设计思想（@修饰器）
* connectstore对ReactDom继承注入action和store，重写<font color=#FF3030 size=4 face="黑体">componentWillUnmount生命周期</font>，离开页面自动触发store初始化
* 使用@修饰器、<font color=#FF3030 size=4 face="黑体">store</font>对reducer提取存入reducerfactory，<font color=#FF3030 size=4 face="黑体">action</font>对action提取存入actionfactory和actiontypefactory
* action的type跟随store定义，并<font color=#FF3030 size=4 face="黑体">隐式添加命名空间</font>解决type重复问题、以及<font color=#FF3030 size=4 face="黑体">隐式case定义</font>省略大量case

### api
```javascript
    /**
     * 数据注入层
     * 提供createStore、getDevTools、getActionType、getAllInitData四个方法
     *
     * createStore方法,绑定数据到整个react路由层
     * @params router(react路由), debug(是否开启调试工具)
     * @return reactRouter
     *
     * getDevTools方法,获取调试工具视图
     * @return DevTools(调试工具视图)
     *
     * getActionType方法,获取storeName下所有actionType
     * @param storeName(数据层名称)
     * @return {}(storeName下所有actionType)
     *
     * getAllInitData方法,获取storeName下所有初始数据
     * @param storeName(数据层名称)
     * @return {}(storeName下所有初始数据)
     */
    import Store from './store/store';
    /**
     * store修饰器,处理整个store层存入数据工厂
     * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
     * @return true
     */
    const store = Store.store;
    /**
     * storeActionType修饰器,按名称录入actionType
     * @params actionType(数据改变响应type), level(日志级别)
     * @return target
     */
    const storeActionType = Store.storeActionType;
    /**
     * storeDestroy修饰器,按名称录入是否需要销毁
     * @return target
     */
    const storeDestroy = Store.storeDestroy;
    
    /**
     * connectStore修饰器,连接数据,事件和reactDom
     * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
     * @return reactDom
     * 由于我会继承你的ReactDom并重写componentWillUnmount生命周期
     * 所以
     * 在你的ReactDom想实现componentWillUnmount生命周期必须加上静态属性
     * 并且上下文还是ReactDom
     * 如下
     * 	static componentWillUnmount (){
         	this._cons();
       	}
    
     _cons(){
            console.log("生命周期销毁");
        }
     */
    import connectStore from './connect/connectstore';
    
    /**
     * 事件注入层
     */
    import Action from './action/action';
    /**
     * action修饰器,处理整个action层存入事件工厂
     * @param actionName(事件层名称)
     * @return target
     */
    const action = Action.action;
    /**
     * actionProps修饰器,按名称录入action
     * @params actionFunName(事件名称), level(日志级别)
     * @return target
     */
    const actionProps = Action.actionProps;
    /**
     * actionInjection修饰器,按名称反向注入事件到reactDom
     * @param actionName(事件名称)
     * @return target
     */
    const actionInjection = Action.actionInjection;
    
    export { Store, store, storeActionType, storeDestroy, connectStore, action, actionProps, actionInjection };
```

### How to use it
npm install reduxm;

### example
见example文件夹下