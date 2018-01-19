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
