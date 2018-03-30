'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionInjection = exports.actionProps = exports.action = exports.connectStore = exports.storeComputed = exports.storeUnDestroy = exports.storeActionType = exports.localStore = exports.store = exports.Store = undefined;

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _connectstore = require('./connect/connectstore');

var _connectstore2 = _interopRequireDefault(_connectstore);

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * store修饰器,处理整个共享性store层存入数据工厂
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
var store = _store2.default.store;
/**
 * localStore修饰器,处理整个组件级store层存入数据工厂(注意:改变共享性数据请通过this.props.popDispatch函数,入参同dispatch)
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
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
var localStore = _store2.default.localStore;
/**
 * storeActionType修饰器,按名称录入actionType
 * @params actionType(数据改变响应type), level(日志级别)
 * @return target
 */
var storeActionType = _store2.default.storeActionType;
/**
 * storeUnDestroy修饰器,按名称录入是否不需要销毁
 * @return target
 */
var storeUnDestroy = _store2.default.storeUnDestroy;
/**
 * storeComputed修饰器,按名称录入计算者(由某个值计算得来)
 * @params dependency(依赖的属性被计算者), level(日志级别)
 * @return target
 */
var storeComputed = _store2.default.storeComputed;

/**
 * connectStore修饰器,连接数据,事件和reactDom,离开页面触发数据销毁
 * @params reducerList[](页面所需全局共享性数据层名称),storeName(组件级无需共享数据层名称),destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */


/**
 * 事件注入层
 */

/**
 * action修饰器,处理整个action层存入事件工厂
 * @param actionName(事件层名称)
 * @return target
 */
var action = _action2.default.action;
/**
 * actionProps修饰器,按名称录入action
 * @params actionFunName(事件名称), level(日志级别)
 * @return target
 */
var actionProps = _action2.default.actionProps;
/**
 * actionInjection修饰器,按名称反向注入事件到reactDom
 * @param actionName(事件名称)
 * @return target
 */
var actionInjection = _action2.default.actionInjection;

exports.Store = _store2.default;
exports.store = store;
exports.localStore = localStore;
exports.storeActionType = storeActionType;
exports.storeUnDestroy = storeUnDestroy;
exports.storeComputed = storeComputed;
exports.connectStore = _connectstore2.default;
exports.action = action;
exports.actionProps = actionProps;
exports.actionInjection = actionInjection;