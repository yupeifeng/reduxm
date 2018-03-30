# [Reduxm](https://github.com/yupeifeng/reduxm)
*为了更好的使用Redux，进行二次封装*

## 内容目录
1. [redux存在的问题](#redux存在的问题)
2. [设计思想](#设计思想)
3. [api](#api)
4. [使用注意点](#使用注意点)
5. [示例](#示例)

## redux存在的问题
* 一份store树，离开页面再次进入，数据不会初始化
* reducer拆分造成汇总困难
* action的type管理混乱，重复问题
* 繁杂的使用规则，index页面action和store引入，纯函数reducer大量case仅仅为了改变一个值

## 设计思想（@修饰器）
* connectstore对ReactDom继承注入action和store，重写<font color=#FF3030 size=4 face="黑体">componentWillUnmount生命周期</font>，离开页面自动触发store初始化
* 使用@修饰器、<font color=#FF3030 size=4 face="黑体">store</font>对reducer提取存入reducerfactory，<font color=#FF3030 size=4 face="黑体">action</font>对action提取存入actionfactory和actiontypefactory
* action的type跟随store定义，并<font color=#FF3030 size=4 face="黑体">隐式添加命名空间</font>解决type重复问题、以及<font color=#FF3030 size=4 face="黑体">隐式case定义</font>省略大量case

## api
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
 * store修饰器,处理整个共享性store层存入数据工厂
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
const store = Store.store;
/**
 * localStore修饰器,处理整个组件级store层存入数据工厂(注意:改变共享性数据请通过this.props.popDispatch函数,入参同dispatch)
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
const localStore = Store.localStore;
/**
 * storeActionType修饰器,按名称录入actionType
 * @params actionType(数据改变响应type), level(日志级别)
 * @return target
 */
const storeActionType = Store.storeActionType;
/**
 * storeUnDestroy修饰器,按名称录入是否不需要销毁
 * @return target
 */
const storeUnDestroy = Store.storeUnDestroy;
/**
 * storeComputed修饰器,按名称录入计算者(由某个值计算得来)
 * @params dependency(依赖的属性被计算者), level(日志级别)
 * @return target
 */
const storeComputed = Store.storeComputed;

/**
 * connectStore修饰器,连接数据,事件和reactDom,离开页面触发数据销毁
 * @params reducerList[](页面所需全局共享性数据层名称),storeName(组件级无需共享数据层名称),destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
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

export {
	Store,
	store,
	localStore,
	storeActionType,
	storeUnDestroy,
	storeComputed,
	connectStore,
	action,
	actionProps,
	actionInjection
};
```

## 使用注意点
1. redux数据共享导致，store改变所有组件都render，如发现页面卡顿请使用localStore进行优化，使用方法见/example/modules/demo2/component
2. 为了方便使用，Store中提供getAllInitData方法，获取storeName下所有初始数据，减少想手动初始化数据时的重复性定义。
3. (dispatch, _this)，action中第二个的系统级入参，提供_this,方便action内部函数互相调用。
4. app.js路由文件中，如果想使用如下方式：
```javascript
(r => {
	r.keys().forEach(r);
})(require.context('./', true, /reducer\.js/));
(r => {
	r.keys().forEach(r);
})(require.context('./', true, /action\.js/));
```
来省略手动引入reducer和action的话，所有页面组件必须按如下异步方式引入
```javascript
const XXX = asyncComponent(() => import(/* webpackChunkName: 'XXX' */ './XXX'));
```
如不想异步引入页面组件，则必须在import { Store } from 'reduxm';和import XXX from '.XXX';之前进行如下引入：
```javascript
import './XXX/reducer';
import './XXX/action';
```

## 示例
见example文件夹下