/**
 * 数据管理层
 */

/**
 * 提供createStore方法(入参reactRouter,debug)绑定store后返回reactRouter
 * 提供getActionType方法获取对应store的actionType(入参storeName)
 * 提供getDevTools方法,返回调试工具视图和Route平级使用
 */
import Store from './store/store';

const store = Store.store; //store注解(入参storeName)
const storeProps = Store.storeProps; //store数据更改响应type注解(入参actionType)
const storeDestroy = Store.storeDestroy; //数据销毁注解(离开页面数据初始化）
const storeLogs = Store.storeLogs; //数据改变日志跟踪注解(入参日志等级'waring','log','error')

/**
 * 数据、reactDom、redux链接层
 * 由于我会继承你的ReactDom并重写componentWillUnmount生命周期
 * 所以
 * 在你的ReactDom想实现componentWillUnmount生命周期必须加上静态属性
 * 并且上下文还是ReactDom
 * 如下
 *  static componentWillUnmount (){
        this._cons();
    }

 	_cons(){
        console.log("生命周期销毁");
    }
 */
import ConnectStore from './connect/connectstore'; //链接层注解(入参storeList:页面所需storeName、destroyStoreList:离开页面初始化storeName)

/**
 * 事件管理层
 */
import Action from './action/action';

const action = Action.action; //action注解(入参actionName)
const actionProps = Action.actionProps; //action层响应函数注解(入参actionFunName)
const actionInjection = Action.actionInjection; //action事件注入注解,注入的react页面(入参actionName)
const actionLogs = Action.actionLogs; //action事件日志跟踪注解(入参日志等级'waring','log','error')

export {
	Store,
	store,
	storeProps,
	storeDestroy,
	storeLogs,
	ConnectStore,
	action,
	actionProps,
	actionInjection,
	actionLogs
};
