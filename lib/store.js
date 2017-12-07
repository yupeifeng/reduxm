'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getActionType = exports.getStore = exports.storeProps = exports.store = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reducerfactory = require('./reducerfactory');

var _reducerfactory2 = _interopRequireDefault(_reducerfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = function store(target) {
	if (!target || typeof target != 'function') {
		throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for appStore.');
	}

	_reducerfactory2.default.initReducer(target);
};

var storeProps = exports.storeProps = function storeProps() {
	var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var destroy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for appStoreProps.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for appStoreProps.');
		}

		target[key] = {
			value: target[key],
			actionType: actionType,
			destroy: destroy
		};
		return target;
	};
};

var getStore = exports.getStore = function getStore() {
	return _reducerfactory2.default.getReducer();
};

var getActionType = exports.getActionType = function getActionType(pageName) {
	return _reducerfactory2.default.getActionType(pageName);
};