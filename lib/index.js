'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionLogs = exports.actionInjection = exports.actionProps = exports.action = exports.ConnectStore = exports.storeLogs = exports.storeDestroy = exports.storeProps = exports.store = exports.Store = undefined;

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _connectstore = require('./connect/connectstore');

var _connectstore2 = _interopRequireDefault(_connectstore);

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//提供createStore方法(入参reactRouter)绑定store后返回reactRouter、getActionType方法获取对应store的actionType(入参storeName)
var store = _store2.default.store; //store注解(入参storeName)
/**
 * 数据管理层
 */
var storeProps = _store2.default.storeProps; //store数据更改响应type注解(入参actionType)
var storeDestroy = _store2.default.storeDestroy; //数据销毁注解(离开页面数据初始化）
var storeLogs = _store2.default.storeLogs; //数据改变日志跟踪注解(入参日志等级'waring','log','error')

/**
 * 数据、reactDom、redux链接层
 */
//链接层注解(入参storeList:页面所需storeName、destroyStoreList:离开页面初始化storeName)

/**
 * 事件管理层
 */


var action = _action2.default.action; //action注解(入参actionName)
var actionProps = _action2.default.actionProps; //action层响应函数注解(入参actionFunName)
var actionInjection = _action2.default.actionInjection; //action事件注入注解,注入的react页面(入参actionName)
var actionLogs = _action2.default.actionLogs; //action事件日志跟踪注解(入参日志等级'waring','log','error')

exports.Store = _store2.default;
exports.store = store;
exports.storeProps = storeProps;
exports.storeDestroy = storeDestroy;
exports.storeLogs = storeLogs;
exports.ConnectStore = _connectstore2.default;
exports.action = action;
exports.actionProps = actionProps;
exports.actionInjection = actionInjection;
exports.actionLogs = actionLogs;