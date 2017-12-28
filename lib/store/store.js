'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _reducerfactory = require('./reducerfactory');

var _reducerfactory2 = _interopRequireDefault(_reducerfactory);

var _actiontypefactory = require('../actiontype/actiontypefactory');

var _actiontypefactory2 = _interopRequireDefault(_actiontypefactory);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxDevtools = require('redux-devtools');

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = require('redux-devtools-dock-monitor');

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//redux的DevTools视图
var DevTools = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(
	_reduxDevtoolsDockMonitor2.default,
	{ toggleVisibilityKey: 'ctrl-h', changePositionKey: 'ctrl-q' },
	_react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' })
));

//按名称存储actionType
var storePropsSign = {};
//按名称存储是否需要销毁
var storeDestroySign = {};
//按名称存储是否需要日志的级别
var storeLogsSign = {};

/**
 * 数据注入层
 */
var Store = (_temp = _class = function Store() {
	_classCallCheck(this, Store);
}, _class.store = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target) {
		if (!storeName) {
			return;
		}

		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for store.');
		}

		/**
   * initialData storeName下,离开页面需要销毁的数据
   * excludeData storeName下,离开页面需要保留的数据
   * actionTypes  storeName下,所有actionType
   * actions      storeName下,所有数据改变函数
   */
		var initialData = {};
		var excludeData = {};
		var actionTypes = {};
		var actions = {};
		//循环整个store原目标对象,按要求提取以上数据

		var _loop = function _loop(key) {
			//提取initialData、excludeData
			if (storeDestroySign[key]) {
				initialData[key] = target[key];
			} else {
				excludeData[key] = target[key];
			}

			if (storePropsSign[key]) {
				//提取actionTypes
				actionTypes[storePropsSign[key]] = storeName + '_' + storePropsSign[key];

				//提取actions
				var storeLogsSignKey = storeLogsSign[key];
				var storePropsSignKey = storePropsSign[key];
				actions[storeName + '_' + storePropsSign[key]] = function (state, action) {
					//埋入日志输出点,便于使用人员定位数据流向
					if (storeLogsSignKey) {
						switch (storeLogsSignKey) {
							case 'waring':
								console.warn('actionType:' + storePropsSignKey + '  storeName:' + key + '  storeSource:' + JSON.stringify(action[key]));
								break;
							case 'log':
								console.log('actionType:' + storePropsSignKey + '  storeName:' + key + '  storeSource:' + JSON.stringify(action[key]));
								break;
							case 'error':
								console.error('actionType:' + storePropsSignKey + '  storeName:' + key + '  storeSource:' + JSON.stringify(action[key]));
								break;
							default:
								break;
						}
					}

					//改变redux的state并返回(真正改变值的方法)
					var arg = {};
					arg[key] = action[key];
					return Object.assign({}, state, arg);
				};
			}
		};

		for (var key in target) {
			_loop(key);
		}

		//按名称将actionTypes存入ActionTypeFactory
		_actiontypefactory2.default.initActionType(storeName, actionTypes);
		//按名称将数据、数据改变函数存入ReducerFactory
		_reducerfactory2.default.initReducer(storeName, initialData, excludeData, actions);

		//清空记录标识等待下次数据存入
		storePropsSign = {};
		storeDestroySign = {};
		storeLogsSign = {};
		return true;
	};
}, _class.storeProps = function () {
	var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for appStoreProps.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for appStoreProps.');
		}

		//按名称存储actionType
		storePropsSign[key] = actionType;
		return target;
	};
}, _class.storeDestroy = function (target, key) {
	if (!target || typeof target != 'function') {
		throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for storeDestroy.');
	}

	if (!key || typeof key != 'string') {
		throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for storeDestroy.');
	}

	//按名称存储是否需要销毁
	storeDestroySign[key] = true;
	return target;
}, _class.storeLogs = function (level) {
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for storeLogs.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for storeLogs.');
		}

		//按名称存储是否需要日志的级别
		storeLogsSign[key] = level;
		return target;
	};
}, _class.createStore = function (router, debug) {
	if (!router || (typeof router === 'undefined' ? 'undefined' : _typeof(router)) != 'object') {
		throw new Error('target Invalid value of type ' + (typeof router === 'undefined' ? 'undefined' : _typeof(router)) + ' for createStore.');
	}

	var store = null;

	if (debug) {
		var enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), DevTools.instrument());

		store = (0, _redux.createStore)(_reducerfactory2.default.getReducer(), enhancer);
	} else {
		store = (0, _redux.createStore)(_reducerfactory2.default.getReducer(), (0, _redux.applyMiddleware)(_reduxThunk2.default));
	}
	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		router
	);
}, _class.getDevTools = function () {
	return _react2.default.createElement(DevTools, null);
}, _class.getActionType = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	return _actiontypefactory2.default.getActionType(storeName);
}, _class.getAllInitData = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	return _reducerfactory2.default.getAllInitData(storeName);
}, _temp);
exports.default = Store;