'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionInjection = exports.actionLogs = exports.actionProps = exports.action = exports.ConnectStore = exports.storeLogs = exports.storeDestroy = exports.storeProps = exports.store = exports.Store = undefined;

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _connectstore = require('./connect/connectstore');

var _connectstore2 = _interopRequireDefault(_connectstore);

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * store修饰器,处理整个store层存入数据工厂
 * @param storeName(数据层名称)
 * @return true
 */
var store = _store2.default.store;
/**
 * storeProps修饰器,按名称录入actionType
 * @param actionType(数据改变响应type)
 * @return target
 */
/**
 * 数据注入层
 */
var storeProps = _store2.default.storeProps;
/**
 * storeDestroy修饰器,按名称录入是否需要销毁
 * @return target
 */
var storeDestroy = _store2.default.storeDestroy;
/**
 * storeLogs修饰器,按名称录入日志级别
 * @param level(日志级别)
 * @returns target
 */
var storeLogs = _store2.default.storeLogs;

/**
 * ConnectStore方法,链接数据，事件和reactDom
 * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
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
 * @param actionFunName(事件名称)
 * @return target
 */
var actionProps = _action2.default.actionProps;
/**
 * actionLogs修饰器,按名称录入日志级别
 * @param level(日志级别)
 * @return target
 */
var actionLogs = _action2.default.actionLogs;
/**
 * actionInjection修饰器,按名称反向注入事件到reactDom
 * @param actionName(事件名称)
 * @return target
 */
var actionInjection = _action2.default.actionInjection;

exports.Store = _store2.default;
exports.store = store;
exports.storeProps = storeProps;
exports.storeDestroy = storeDestroy;
exports.storeLogs = storeLogs;
exports.ConnectStore = _connectstore2.default;
exports.action = action;
exports.actionProps = actionProps;
exports.actionLogs = actionLogs;
exports.actionInjection = actionInjection;