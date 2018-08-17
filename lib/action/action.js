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

//按名称存储action
var actionPropsSign = {};
//按名称存储action日志级别
var actionLogsSign = {};

//按名称存储action(全局)
var actionGlobalSign = {};
//按名称存储action日志级别(全局)
var actionGlobalLogsSign = {};

/**
 * 事件注入层
 */
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

		//actions actionName下,所有响应事件
		var actions = {};
		var actionsGlobal = {};

		var _loop = function _loop(key) {
			if (actionPropsSign[key]) {
				//提取actions
				actions[actionPropsSign[key]] = function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					return function (dispatch) {
						var _console, _console2, _console3;

						//埋入日志输出点,便于使用人员定位事件触发
						if (actionLogsSign[key]) {
							switch (actionLogsSign[key]) {
								case 'warn':
									console.warn('---actionFunName:' + actionPropsSign[key] + '--- \n ---actionParams:');
									(_console = console).warn.apply(_console, args);
									break;
								case 'log':
									console.log('---actionFunName:' + actionPropsSign[key] + '--- \n ---actionParams:');
									(_console2 = console).log.apply(_console2, args);
									break;
								case 'error':
									console.error('---actionFunName:' + actionPropsSign[key] + '--- \n ---actionParams:');
									(_console3 = console).error.apply(_console3, args);
									break;
								default:
									break;
							}
						}
						//传达target,给业务层action静态方法互相调用使用
						target[key].apply(target, args)(dispatch, target);
					};
				};
			}

			if (actionGlobalSign[key]) {
				//提取全局性actions
				actionsGlobal[actionGlobalSign[key]] = function () {
					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}

					return function (dispatch) {
						var _console4, _console5, _console6;

						//埋入日志输出点,便于使用人员定位事件触发
						if (actionGlobalLogsSign[key]) {
							switch (actionGlobalLogsSign[key]) {
								case 'warn':
									console.warn('---actionFunName:' + actionGlobalSign[key] + '--- \n ---actionParams:');
									(_console4 = console).warn.apply(_console4, args);
									break;
								case 'log':
									console.log('---actionFunName:' + actionGlobalSign[key] + '--- \n ---actionParams:');
									(_console5 = console).log.apply(_console5, args);
									break;
								case 'error':
									console.error('---actionFunName:' + actionGlobalSign[key] + '--- \n ---actionParams:');
									(_console6 = console).error.apply(_console6, args);
									break;
								default:
									break;
							}
						}
						//传达target,给业务层action静态方法互相调用使用
						target[key].apply(target, args)(dispatch, target);
					};
				};
			}
		};

		for (var key in target) {
			_loop(key);
		}

		//按名称将事件存入ActionFactory
		_actionfactory2.default.initAction(actionName, actions);

		//按名称将全局性action存入ActionFactory
		_actionfactory2.default.initGlobalAction(actionName, actionsGlobal);

		//清空记录标识等待下次数据存入
		actionPropsSign = {};
		actionLogsSign = {};
		actionGlobalSign = {};
		actionGlobalLogsSign = {};

		return target;
	};
}, _class.actionProps = function () {
	var actionFunName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionProps.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for actionProps.');
		}

		//按名称录入action
		actionPropsSign[key] = actionFunName;

		//按名称录入日志级别
		if (level) {
			actionLogsSign[key] = level;
		}

		return target;
	};
}, _class.actionGlobal = function () {
	var actionFunName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionGlobal.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for actionGlobal.');
		}

		//按名称录入action
		actionGlobalSign[key] = actionFunName;

		//按名称录入日志级别
		if (level) {
			actionGlobalLogsSign[key] = level;
		}

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

		//按名称反向注入事件到reactDom的mapDispatchToProps,供connectstore使用
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