'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionInjection = exports.actionProps = exports.action = exports.ConnectStore = exports.storeLogs = exports.storeDestroy = exports.storeProps = exports.store = exports.Store = undefined;

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _connectstore = require('./connect/connectstore');

var _connectstore2 = _interopRequireDefault(_connectstore);

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//提供getStore方法获取整个store以及getActionType方法获取对应store的actionType入参storeName
var store = _store2.default.store; //store注解 入参storeName
/**
 * 数据管理层
 */
var storeProps = _store2.default.storeProps; //store数据更改响应type注解 入参actionType
var storeDestroy = _store2.default.storeDestroy; //数据销毁注解（离开页面数据初始化）
var storeLogs = _store2.default.storeLogs; //数据改变日志跟踪注解

/**
 * 数据、reactDom、redux链接层
 */
//链接层注解 入参destroyStoreList(离开页面初始化store)、storeList(页面所需store)

/**
 * 事件管理层
 */


var action = _action2.default.action; //action注解 入参actionName
var actionProps = _action2.default.actionProps; //action层响应函数注解 入参actionFunName
var actionInjection = _action2.default.actionInjection; //action事件注入注解,注入的react页面 入参actionName

exports.Store = _store2.default;
exports.store = store;
exports.storeProps = storeProps;
exports.storeDestroy = storeDestroy;
exports.storeLogs = storeLogs;
exports.ConnectStore = _connectstore2.default;
exports.action = action;
exports.actionProps = actionProps;
exports.actionInjection = actionInjection;