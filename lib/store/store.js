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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = (_temp = _class = function Store() {
	_classCallCheck(this, Store);
}, _class.store = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target) {
		if (!storeName) {
			return;
		}

		var initialState = {};
		var excludeState = {};
		var actionTypes = {};
		var actions = {};

		var _loop = function _loop(i) {
			if (target[i]['reducerManager_destroy']) {
				if (target[i]['reducerManager_value'] === undefined) {
					initialState[i] = target[i];
				} else {
					initialState[i] = target[i]['reducerManager_value'];
				}
			} else {
				if (target[i]['reducerManager_value'] === undefined) {
					excludeState[i] = target[i];
				} else {
					excludeState[i] = target[i]['reducerManager_value'];
				}
			}

			if (target[i]['reducerManager_actionType']) {
				actionTypes[target[i]['reducerManager_actionType']] = storeName + '_' + target[i]['reducerManager_actionType'];

				actions[storeName + '_' + target[i]['reducerManager_actionType']] = function (state, action) {
					if (target[i]['reducerManager_log']) {
						console.log('actionType:' + target[i]['reducerManager_actionType'] + '  storeName:' + i + '  storeSource:' + JSON.stringify(action[i]));
					}
					var arg = {};
					arg[i] = action[i];
					return Object.assign({}, state, arg);
				};
			}
		};

		for (var i in target) {
			_loop(i);
		}

		actionTypes.sys_restState = storeName + '_sys_restState';

		_actiontypefactory2.default.initActionType(storeName, actionTypes);

		_reducerfactory2.default.initReducer(storeName, initialState, excludeState, actions);
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

		if (target[key]['reducerManager_value'] === undefined) {
			target[key] = {
				reducerManager_value: target[key],
				reducerManager_actionType: actionType
			};
		} else {
			target[key]['reducerManager_actionType'] = actionType;
		}
		return target;
	};
}, _class.storeDestroy = function (target, key) {
	if (!target || typeof target != 'function') {
		throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for storeDestroy.');
	}

	if (!key || typeof key != 'string') {
		throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for storeDestroy.');
	}

	if (target[key]['reducerManager_value'] === undefined) {
		target[key] = {
			reducerManager_value: target[key],
			reducerManager_destroy: true
		};
	} else {
		target[key]['reducerManager_destroy'] = true;
	}
	return target;
}, _class.storeLogs = function (target, key) {
	if (!target || typeof target != 'function') {
		throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for storeLogs.');
	}

	if (!key || typeof key != 'string') {
		throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for storeLogs.');
	}

	if (target[key]['reducerManager_value'] === undefined) {
		target[key] = {
			reducerManager_value: target[key],
			reducerManager_log: true
		};
	} else {
		target[key]['reducerManager_log'] = true;
	}
	return target;
}, _class.getStore = function () {
	return _reducerfactory2.default.getReducer();
}, _class.getActionType = function () {
	var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	return _actiontypefactory2.default.getActionType(storeName);
}, _temp);
exports.default = Store;