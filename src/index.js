/**
 * 数据管理层
 */
import Store from './store/store'; //提供getStore方法获取整个store以及getActionType方法获取对应store的actionType入参storeName
const store = Store.store; //store注解 入参storeName
const storeProps = Store.storeProps; //store数据更改响应type注解 入参actionType
const storeDestroy = Store.storeDestroy; //数据销毁注解（离开页面数据初始化）
const storeLogs = Store.storeLogs; //数据改变日志跟踪注解 入参日志等级('waring','log','error')

/**
 * 数据、reactDom、redux链接层
 */
import ConnectStore from './connect/connectstore'; //链接层注解 入参storeList(页面所需store)、destroyStoreList(离开页面初始化store)

/**
 * 事件管理层
 */
import Action from './action/action';

const action = Action.action; //action注解 入参actionName
const actionProps = Action.actionProps; //action层响应函数注解 入参actionFunName
const actionInjection = Action.actionInjection; //action事件注入注解,注入的react页面 入参actionName
const actionLogs = Action.actionLogs; //action事件日志跟踪注解 入参日志等级('waring','log','error')

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
