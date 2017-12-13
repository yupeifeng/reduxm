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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storePropsSign = {};

var storeDestroySign = {};

var storeLogsSign = {};

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

		var initialState = {};
		var excludeState = {};
		var actionTypes = {};
		var actions = {};

		var _loop = function _loop(key) {
			if (storeDestroySign[key]) {
				initialState[key] = target[key];
			} else {
				excludeState[key] = target[key];
			}

			if (storePropsSign[key]) {
				actionTypes[storePropsSign[key]] = storeName + '_' + storePropsSign[key];

				var storeLogsSignKey = storeLogsSign[key];
				var storePropsSignKey = storePropsSign[key];

				actions[storeName + '_' + storePropsSign[key]] = function (state, action) {
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

					var arg = {};
					arg[key] = action[key];

					return Object.assign({}, state, arg);
				};
			}
		};

		for (var key in target) {
			_loop(key);
		}

		actionTypes.sys_restState = storeName + '_sys_restState';

		_actiontypefactory2.default.initActionType(storeName, actionTypes);

		_reducerfactory2.default.initReducer(storeName, initialState, excludeState, actions);

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

		storeLogsSign[key] = level;

		return target;
	};
}, _class.createStore = function (router) {
	if (!router || (typeof router === 'undefined' ? 'undefined' : _typeof(router)) != 'object') {
		throw new Error('target Invalid value of type ' + (typeof router === 'undefined' ? 'undefined' : _typeof(router)) + ' for createStore.');
	}

	var store = (0, _redux.createStore)(_reducerfactory2.default.getReducer(), (0, _redux.applyMiddleware)(_reduxThunk2.default));
	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		router
	);
}, _class.getActionType = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	return _actiontypefactory2.default.getActionType(storeName);
}, _temp);
exports.default = Store;