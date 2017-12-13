'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _actionfactory = require('./actionfactory');

var _actionfactory2 = _interopRequireDefault(_actionfactory);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var actionPropsSign = {};
var actionLogsSign = {};

var Action = (_temp = _class = function Action() {
	_classCallCheck(this, Action);
}, _class.action = function () {
	var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target) {
		if (!actionName) {
			return target;
		}

		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for action.');
		}

		var actions = {};

		var _loop = function _loop(key) {
			if (actionPropsSign[key]) {
				actions[actionPropsSign[key]] = function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					return function (dispatch) {
						if (actionLogsSign[key]) {
							switch (actionLogsSign[key]) {
								case 'waring':
									console.warn('actionFunName:' + actionPropsSign[key] + ' actionParams:' + JSON.stringify(args));
									break;
								case 'log':
									console.log('actionFunName:' + actionPropsSign[key] + ' actionParams:' + JSON.stringify(args));
									break;
								case 'error':
									console.error('actionFunName:' + actionPropsSign[key] + ' actionParams:' + JSON.stringify(args));
									break;
								default:
									break;
							}
						}
						target[key].apply(target, args)(dispatch);
					};
				};
			}
		};

		for (var key in target) {
			_loop(key);
		}

		_actionfactory2.default.initAction(actionName, actions);

		return target;
	};
}, _class.actionProps = function () {
	var actionFunName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionProps.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for actionProps.');
		}

		actionPropsSign[key] = actionFunName;

		return target;
	};
}, _class.actionLogs = function (level) {
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionLogs.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for actionLogs.');
		}

		actionLogsSign[key] = level;

		return target;
	};
}, _class.actionInjection = function () {
	var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionInjection.');
		}

		if (!actionName) {
			return target;
		}

		var actions = _actionfactory2.default.getAction(actionName);

		target.mapDispatchToProps = function (dispatch) {
			var mapDispatchToPropsParams = {};

			for (var key in actions) {
				if (actions[key]) {
					mapDispatchToPropsParams[key] = (0, _redux.bindActionCreators)(actions[key], dispatch);
				}
			}
			return mapDispatchToPropsParams;
		};

		return target;
	};
}, _temp);
exports.default = Action;